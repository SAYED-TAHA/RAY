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
import { authenticateToken, authorize } from '../../middleware/auth.js';
import { validateObjectId } from '../../middleware/validation.js';

const router = express.Router();

// Protected routes (admin or merchant)
router.get('/', authenticateToken, authorize('admin', 'merchant'), getOrders);
router.get('/stats', authenticateToken, authorize('admin', 'merchant'), getOrderStats);
router.get('/:id', authenticateToken, authorize('admin', 'merchant'), validateObjectId, getOrderById);

// Protected routes (admin or merchant)
router.post('/', 
  authenticateToken, 
  authorize('admin', 'merchant'),
  createOrder
);

router.put('/:id', 
  authenticateToken, 
  authorize('admin', 'merchant'),
  validateObjectId, 
  updateOrder
);

router.patch('/:id/status', 
  authenticateToken, 
  authorize('admin', 'merchant'),
  validateObjectId, 
  updateOrderStatus
);

router.delete('/:id', 
  authenticateToken, 
  authorize('admin', 'merchant'),
  validateObjectId, 
  deleteOrder
);

export default router;
