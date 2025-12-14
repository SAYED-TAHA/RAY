import StorefrontConfig from '../../models/StorefrontConfig.js';

// الحصول على إعدادات المتجر
export const getStorefrontConfig = async (req, res) => {
  try {
    const { merchantId } = req.params;

    const config = await StorefrontConfig.findOne({ merchantId });

    if (!config) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على الإعدادات',
      });
    }

    res.status(200).json({
      success: true,
      data: config,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب الإعدادات',
      error: error.message,
    });
  }
};

// إنشاء أو تحديث إعدادات المتجر
export const saveStorefrontConfig = async (req, res) => {
  try {
    const { merchantId } = req.params;
    const configData = req.body;

    let config = await StorefrontConfig.findOne({ merchantId });

    if (!config) {
      config = new StorefrontConfig({
        merchantId,
        ...configData,
      });
    } else {
      Object.assign(config, configData);
    }

    await config.save();

    res.status(200).json({
      success: true,
      message: 'تم حفظ الإعدادات بنجاح',
      data: config,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطأ في حفظ الإعدادات',
      error: error.message,
    });
  }
};

// إعادة تعيين الإعدادات
export const resetStorefrontConfig = async (req, res) => {
  try {
    const { merchantId } = req.params;

    const config = await StorefrontConfig.findOne({ merchantId });

    if (!config) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على الإعدادات',
      });
    }

    // إعادة تعيين الإعدادات إلى القيم الافتراضية
    config.primaryColor = '#FF6B6B';
    config.secondaryColor = '#4ECDC4';
    config.accentColor = '#FFE66D';
    config.backgroundColor = '#FFFFFF';
    config.textColor = '#333333';
    config.headerColor = '#FFFFFF';
    config.headerTextColor = '#333333';
    config.footerColor = '#1F2937';
    config.footerTextColor = '#FFFFFF';
    config.bannerType = 'image';
    config.bannerImage = 'https://via.placeholder.com/1200x400';
    config.bannerVideo = '';
    config.bannerHeight = 400;
    config.showHeaderPhone = true;
    config.showHeaderWhatsapp = true;
    config.showHeaderEmail = false;
    config.showHeaderSearch = true;
    config.showHeaderCart = true;
    config.showFooterPhone = true;
    config.showFooterWhatsapp = true;
    config.showFooterEmail = true;
    config.showFooterAddress = true;
    config.showFooterSocial = true;
    config.showContactPhone = true;
    config.showContactWhatsapp = true;
    config.showContactEmail = true;
    config.showHero = true;
    config.showGallery = true;
    config.showMenu = true;
    config.showProducts = true;
    config.showReviews = true;
    config.showBookings = true;
    config.showMap = true;

    await config.save();

    res.status(200).json({
      success: true,
      message: 'تم إعادة تعيين الإعدادات بنجاح',
      data: config,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطأ في إعادة تعيين الإعدادات',
      error: error.message,
    });
  }
};

// رفع صورة البنر
export const uploadBannerImage = async (req, res) => {
  try {
    const { merchantId } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'لم يتم تحديد صورة',
      });
    }

    const config = await StorefrontConfig.findOne({ merchantId });

    if (!config) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على الإعدادات',
      });
    }

    // حفظ مسار الصورة (في بيئة الإنتاج، يجب استخدام خدمة تخزين سحابية)
    config.bannerImage = `/uploads/${req.file.filename}`;

    await config.save();

    res.status(200).json({
      success: true,
      message: 'تم رفع الصورة بنجاح',
      data: {
        bannerImage: config.bannerImage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطأ في رفع الصورة',
      error: error.message,
    });
  }
};

// رفع صور المعرض
export const uploadGalleryImages = async (req, res) => {
  try {
    const { merchantId } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'لم يتم تحديد صور',
      });
    }

    const config = await StorefrontConfig.findOne({ merchantId });

    if (!config) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على الإعدادات',
      });
    }

    // إضافة الصور الجديدة
    const newImages = req.files.map(file => `/uploads/${file.filename}`);
    config.galleryImages = [...config.galleryImages, ...newImages];

    // الحد الأقصى 12 صورة
    if (config.galleryImages.length > 12) {
      config.galleryImages = config.galleryImages.slice(-12);
    }

    await config.save();

    res.status(200).json({
      success: true,
      message: 'تم رفع الصور بنجاح',
      data: {
        galleryImages: config.galleryImages,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطأ في رفع الصور',
      error: error.message,
    });
  }
};

// حذف صورة من المعرض
export const deleteGalleryImage = async (req, res) => {
  try {
    const { merchantId, imageIndex } = req.params;

    const config = await StorefrontConfig.findOne({ merchantId });

    if (!config) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على الإعدادات',
      });
    }

    config.galleryImages.splice(imageIndex, 1);
    await config.save();

    res.status(200).json({
      success: true,
      message: 'تم حذف الصورة بنجاح',
      data: {
        galleryImages: config.galleryImages,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطأ في حذف الصورة',
      error: error.message,
    });
  }
};
