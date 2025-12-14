// التحقق من صحة merchantId
export const validateMerchantId = (req, res, next) => {
  const { merchantId } = req.params;

  if (!merchantId || typeof merchantId !== 'string' || merchantId.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'معرف التاجر غير صحيح',
    });
  }

  if (merchantId.length > 50) {
    return res.status(400).json({
      success: false,
      message: 'معرف التاجر طويل جداً',
    });
  }

  next();
};

// التحقق من صحة بيانات الإعدادات
export const validateStorefrontConfig = (req, res, next) => {
  const { body } = req;

  // التحقق من الألوان
  const colorFields = [
    'primaryColor',
    'secondaryColor',
    'accentColor',
    'backgroundColor',
    'textColor',
    'headerColor',
    'headerTextColor',
    'footerColor',
    'footerTextColor',
  ];

  for (const field of colorFields) {
    if (body[field] && !isValidColor(body[field])) {
      return res.status(400).json({
        success: false,
        message: `${field} لون غير صحيح`,
      });
    }
  }

  // التحقق من ارتفاع البنر
  if (body.bannerHeight) {
    const height = parseInt(body.bannerHeight);
    if (isNaN(height) || height < 200 || height > 600) {
      return res.status(400).json({
        success: false,
        message: 'ارتفاع البنر يجب أن يكون بين 200 و 600',
      });
    }
  }

  // التحقق من نوع البنر
  if (body.bannerType && !['image', 'video'].includes(body.bannerType)) {
    return res.status(400).json({
      success: false,
      message: 'نوع البنر غير صحيح',
    });
  }

  next();
};

// التحقق من صحة اللون
const isValidColor = (color) => {
  // التحقق من صيغة hex
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (hexRegex.test(color)) return true;

  // التحقق من صيغة rgb
  const rgbRegex = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
  if (rgbRegex.test(color)) return true;

  return false;
};

// معالج الأخطاء العام
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // خطأ في رفع الملفات
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'حجم الملف كبير جداً (الحد الأقصى 5MB)',
    });
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    return res.status(400).json({
      success: false,
      message: 'عدد الملفات كبير جداً',
    });
  }

  if (err.message && err.message.includes('نوع الملف')) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // خطأ عام
  res.status(500).json({
    success: false,
    message: 'حدث خطأ في الخادم',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};
