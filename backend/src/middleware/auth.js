import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';

// Authentication middleware
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  (async () => {
    try {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.userId).select('role isActive isEmailVerified subscription');

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (!user.isActive) {
        return res.status(403).json({ message: 'Account is deactivated' });
      }

      req.user = {
        ...decoded,
        id: user._id,
        userId: user._id,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        subscription: user.subscription?.plan || decoded.subscription
      };
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  })();
};

// Admin role check middleware
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
