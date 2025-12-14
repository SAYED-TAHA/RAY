// Rate Limiting بسيط بدون مكتبة خارجية
const requestCounts = new Map();
const WINDOW_SIZE = 60 * 1000; // دقيقة واحدة
const MAX_REQUESTS = 100; // 100 طلب في الدقيقة

export const rateLimit = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, []);
  }

  const requests = requestCounts.get(ip);

  // حذف الطلبات القديمة
  const recentRequests = requests.filter(time => now - time < WINDOW_SIZE);
  requestCounts.set(ip, recentRequests);

  if (recentRequests.length >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: 'تم تجاوز حد الطلبات. حاول مرة أخرى لاحقاً',
    });
  }

  recentRequests.push(now);
  next();
};

// تنظيف الذاكرة كل 10 دقائق
setInterval(() => {
  const now = Date.now();
  for (const [ip, requests] of requestCounts.entries()) {
    const recentRequests = requests.filter(time => now - time < WINDOW_SIZE);
    if (recentRequests.length === 0) {
      requestCounts.delete(ip);
    } else {
      requestCounts.set(ip, recentRequests);
    }
  }
}, 10 * 60 * 1000);
