// Simple in-memory rate limiter for development
const requestCounts = new Map();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100; // Max requests per window

export const rateLimiter = (maxRequests = MAX_REQUESTS, windowMs = WINDOW_MS) => {
  return (req, res, next) => {
    try {
      // Get client IP from various sources
      const forwarded = req.headers?.['x-forwarded-for'];
      const ip = forwarded ? forwarded.split(',')[0].trim() : 
                  req.socket?.remoteAddress || 
                  req.connection?.remoteAddress || 
                  '127.0.0.1';
      
      const key = ip;
      const now = Date.now();
    
    if (!requestCounts.has(key)) {
      requestCounts.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    const requestData = requestCounts.get(key);
    
    if (now > requestData.resetTime) {
      requestCounts.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    if (requestData.count >= maxRequests) {
      return res.status(429).json({ 
        message: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil((requestData.resetTime - now) / 1000)
      });
    }
    
    requestData.count++;
    next();
    } catch (error) {
      // If rate limiter fails, allow the request to proceed
      console.error('Rate limiter error:', error);
      next();
    }
  };
};

// Stricter rate limiting for write operations
export const strictRateLimiter = rateLimiter(20, WINDOW_MS); // 20 requests per 15 minutes

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of requestCounts.entries()) {
    if (now > data.resetTime) {
      requestCounts.delete(key);
    }
  }
}, 60000); // Clean up every minute
