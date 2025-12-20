import express from 'express';
import {
  getAnalytics,
  getDashboardOverview,
  getSalesReport
} from '../controllers/controllers/analyticsController.js';
import { authenticateToken, requireAdmin } from '../../middleware/auth.js';
import { rateLimiter, strictRateLimiter } from '../../middleware/rateLimiter.js';

const router = express.Router();

router.post('/search', rateLimiter, async (req, res) => {
  try {
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// Protected admin routes
router.get('/', authenticateToken, requireAdmin, strictRateLimiter, getAnalytics);
router.get('/dashboard', authenticateToken, requireAdmin, strictRateLimiter, getDashboardOverview);
router.get('/sales', authenticateToken, requireAdmin, strictRateLimiter, getSalesReport);

export default router;
