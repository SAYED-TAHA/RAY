import express from 'express';
import {
  searchProducts,
  getSuggestions,
  getPopularKeywords
} from '../controllers/controllers/searchController.js';
import { rateLimiter } from '../../middleware/rateLimiter.js';

const router = express.Router();

// Search products with advanced filters
router.get('/', rateLimiter(), searchProducts);

// Get search suggestions
router.get('/suggestions', rateLimiter(), getSuggestions);

// Get popular keywords
router.get('/keywords/popular', rateLimiter(), getPopularKeywords);

export default router;
