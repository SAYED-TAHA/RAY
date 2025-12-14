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

const router = express.Router();

// تطبيق Rate Limiting على جميع الطلبات
router.use(rateLimit);

// الحصول على الإعدادات
router.get('/:merchantId', validateMerchantId, getStorefrontConfig);

// حفظ الإعدادات
router.post('/:merchantId', validateMerchantId, validateStorefrontConfig, saveStorefrontConfig);

// إعادة تعيين الإعدادات
router.post('/:merchantId/reset', validateMerchantId, resetStorefrontConfig);

// رفع صورة البنر
router.post('/:merchantId/banner', validateMerchantId, uploadSingle, uploadBannerImage);

// رفع صور المعرض
router.post('/:merchantId/gallery', validateMerchantId, uploadMultiple, uploadGalleryImages);

// حذف صورة من المعرض
router.delete('/:merchantId/gallery/:imageIndex', validateMerchantId, deleteGalleryImage);

// معالج الأخطاء
router.use(errorHandler);

export default router;
