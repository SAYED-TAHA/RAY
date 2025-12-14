import Redis from 'ioredis';

// Redis client for caching
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true
});

// Cache middleware
const cache = (duration = 300) => {
  return async (req, res, next) => {
    if (req.method !== 'GET') return next();

    const key = `cache:${req.originalUrl}:${req.user?.id || 'anonymous'}`;
    
    try {
      const cached = await redis.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }

      // Override res.json to cache response
      const originalJson = res.json;
      res.json = function(data) {
        // Cache successful responses
        if (res.statusCode === 200) {
          redis.setex(key, duration, JSON.stringify(data)).catch(console.error);
        }
        return originalJson.call(this, data);
      };

      next();
    } catch (error) {
      console.error('Cache error:', error);
      next();
    }
  };
};

// Clear cache for specific pattern
const clearCache = async (pattern) => {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error('Clear cache error:', error);
  }
};

// Cache invalidation middleware
const invalidateCache = (patterns) => {
  return async (req, res, next) => {
    const originalJson = res.json;
    res.json = async function(data) {
      // Clear cache after successful operations
      if (res.statusCode >= 200 && res.statusCode < 300) {
        for (const pattern of patterns) {
          await clearCache(pattern);
        }
      }
      return originalJson.call(this, data);
    };
    next();
  };
};

// Memory cache fallback
const memoryCache = new Map();
const memoryCacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    if (req.method !== 'GET') return next();

    const key = req.originalUrl;
    const cached = memoryCache.get(key);

    if (cached && Date.now() - cached.timestamp < duration * 1000) {
      return res.json(cached.data);
    }

    const originalJson = res.json;
    res.json = function(data) {
      if (res.statusCode === 200) {
        memoryCache.set(key, {
          data,
          timestamp: Date.now()
        });
      }
      return originalJson.call(this, data);
    };

    next();
  };
};

export { redis, cache, clearCache, invalidateCache, memoryCacheMiddleware };
