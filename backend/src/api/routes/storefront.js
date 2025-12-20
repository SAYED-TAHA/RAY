import express from 'express';
import {
  getStorefrontConfig,
  saveStorefrontConfig,
  resetStorefrontConfig,
  uploadBannerImage,
  uploadGalleryImages,
  deleteGalleryImage,
} from '../controllers/storefrontController.js';
import { uploadSingle, uploadMultiple } from '../middleware/uploadMiddleware.js';
import { validateMerchantId, validateStorefrontConfig, errorHandler } from '../middleware/validationMiddleware.js';
import { rateLimit } from '../middleware/rateLimitMiddleware.js';
import { authenticateToken } from '../../middleware/auth.js';
import { authorize } from '../../config/passport.js';

const router = express.Router();

// تطبيق Rate Limiting على جميع الطلبات
router.use(rateLimit);

// الحصول على الإعدادات
router.get('/:merchantId', validateMerchantId, getStorefrontConfig);

// حفظ الإعدادات
router.post(
  '/:merchantId',
  authenticateToken,
  authorize('merchant', 'admin'),
  validateMerchantId,
  validateStorefrontConfig,
  saveStorefrontConfig
);

// إعادة تعيين الإعدادات
router.post(
  '/:merchantId/reset',
  authenticateToken,
  authorize('merchant', 'admin'),
  validateMerchantId,
  resetStorefrontConfig
);

// رفع صورة البنر
router.post(
  '/:merchantId/banner',
  authenticateToken,
  authorize('merchant', 'admin'),
  validateMerchantId,
  uploadSingle,
  uploadBannerImage
);

// رفع صور المعرض
router.post(
  '/:merchantId/gallery',
  authenticateToken,
  authorize('merchant', 'admin'),
  validateMerchantId,
  uploadMultiple,
  uploadGalleryImages
);

// حذف صورة من المعرض
router.delete(
  '/:merchantId/gallery/:imageIndex',
  authenticateToken,
  authorize('merchant', 'admin'),
  validateMerchantId,
  deleteGalleryImage
);

// معالج الأخطاء
router.use(errorHandler);

export default router;
