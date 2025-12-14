import express from 'express';
import {
  getAuditLogs,
  getSecurityEvents,
  getSecuritySettings,
  updateSecuritySettings
} from '../controllers/controllers/auditController.js';
import { authenticateToken, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();

// Protected admin routes
router.get('/logs', authenticateToken, requireAdmin, getAuditLogs);
router.get('/security/events', authenticateToken, requireAdmin, getSecurityEvents);
router.get('/security/settings', authenticateToken, requireAdmin, getSecuritySettings);
router.put('/security/settings', authenticateToken, requireAdmin, updateSecuritySettings);

export default router;
