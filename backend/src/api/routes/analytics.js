import express from 'express';
import {
  getAnalytics,
  getDashboardOverview,
  getSalesReport
} from '../controllers/controllers/analyticsController.js';
import { authenticateToken, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();

// Protected admin routes
router.get('/', authenticateToken, requireAdmin, getAnalytics);
router.get('/dashboard', authenticateToken, requireAdmin, getDashboardOverview);
router.get('/sales', authenticateToken, requireAdmin, getSalesReport);

export default router;
