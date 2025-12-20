import express from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderStats
} from '../controllers/controllers/orderController.js';
import { authenticateToken, requireAdmin } from '../../middleware/auth.js';
import { validateObjectId } from '../../middleware/validation.js';

const router = express.Router();

// Protected admin routes
router.get('/', authenticateToken, requireAdmin, getOrders);
router.get('/stats', authenticateToken, requireAdmin, getOrderStats);
router.get('/:id', authenticateToken, requireAdmin, validateObjectId, getOrderById);

// Protected admin routes
router.post('/', 
  authenticateToken, 
  requireAdmin, 
  createOrder
);

router.put('/:id', 
  authenticateToken, 
  requireAdmin, 
  validateObjectId, 
  updateOrder
);

router.patch('/:id/status', 
  authenticateToken, 
  requireAdmin, 
  validateObjectId, 
  updateOrderStatus
);

router.delete('/:id', 
  authenticateToken, 
  requireAdmin, 
  validateObjectId, 
  deleteOrder
);

export default router;
