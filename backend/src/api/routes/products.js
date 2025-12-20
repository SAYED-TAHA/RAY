import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/controllers/productController.js';
import { authenticateToken, requireAdmin } from '../../middleware/auth.js';
import { validateProductInput, validateObjectId } from '../../middleware/validation.js';
import { rateLimiter, strictRateLimiter } from '../../middleware/rateLimiter.js';

const router = express.Router();

// Public routes
router.get('/', rateLimiter(), getProducts);
router.get('/:id', rateLimiter(), validateObjectId, getProductById);

// Protected admin routes
router.post('/', 
  strictRateLimiter,
  authenticateToken, 
  requireAdmin, 
  validateProductInput, 
  createProduct
);

router.put('/:id', 
  strictRateLimiter,
  authenticateToken, 
  requireAdmin, 
  validateObjectId, 
  validateProductInput, 
  updateProduct
);

router.delete('/:id', 
  strictRateLimiter,
  authenticateToken, 
  requireAdmin, 
  validateObjectId, 
  deleteProduct
);

export default router;
