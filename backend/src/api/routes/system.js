import express from 'express';
import {
  getSystemHealth,
  getSystemLogs,
  getSystemStats
} from '../controllers/controllers/systemController.js';
import { authenticateToken, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();

// Protected admin routes
router.get('/health', authenticateToken, requireAdmin, getSystemHealth);
router.get('/logs', authenticateToken, requireAdmin, getSystemLogs);
router.get('/stats', authenticateToken, requireAdmin, getSystemStats);

export default router;
