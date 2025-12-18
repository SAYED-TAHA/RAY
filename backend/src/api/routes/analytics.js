import express from 'express';
import {
  getAnalytics,
  getDashboardOverview,
  getSalesReport
} from '../controllers/controllers/analyticsController.js';
import { authenticateToken, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();

router.post('/search', async (req, res) => {
  try {
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// Protected admin routes
router.get('/', authenticateToken, requireAdmin, getAnalytics);
router.get('/dashboard', authenticateToken, requireAdmin, getDashboardOverview);
router.get('/sales', authenticateToken, requireAdmin, getSalesReport);

export default router;
