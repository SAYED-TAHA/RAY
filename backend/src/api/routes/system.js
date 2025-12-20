import express from 'express';
import {
  getSystemHealth,
  getSystemLogs,
  getSystemStats
} from '../controllers/controllers/systemController.js';
import { authenticateToken, requireAdmin } from '../../middleware/auth.js';
import { strictRateLimiter } from '../../middleware/rateLimiter.js';

const router = express.Router();

// Protected admin routes - all require strict rate limiting
router.get('/health', authenticateToken, requireAdmin, strictRateLimiter, getSystemHealth);
router.get('/logs', authenticateToken, requireAdmin, strictRateLimiter, getSystemLogs);
router.get('/stats', authenticateToken, requireAdmin, strictRateLimiter, getSystemStats);

export default router;
