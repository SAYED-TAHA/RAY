import express from 'express';
import {
  getAuditLogs,
  getSecurityEvents,
  getSecuritySettings,
  updateSecuritySettings
} from '../controllers/controllers/auditController.js';
import { authenticateToken, requireAdmin } from '../../middleware/auth.js';
import { strictRateLimiter } from '../../middleware/rateLimiter.js';

const router = express.Router();

// Protected admin routes - all require strict rate limiting
router.get('/logs', authenticateToken, requireAdmin, strictRateLimiter, getAuditLogs);
router.get('/security/events', authenticateToken, requireAdmin, strictRateLimiter, getSecurityEvents);
router.get('/security/settings', authenticateToken, requireAdmin, strictRateLimiter, getSecuritySettings);
router.put('/security/settings', authenticateToken, requireAdmin, strictRateLimiter, updateSecuritySettings);

export default router;
