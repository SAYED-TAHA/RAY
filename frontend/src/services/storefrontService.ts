const API_BASE = '/api/storefront';

export interface StorefrontConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headerColor: string;
  headerTextColor: string;
  footerColor: string;
  footerTextColor: string;
  bannerType: 'image' | 'video';
  bannerImage: string;
  bannerVideo: string;
  bannerHeight: number;
  showHeaderPhone: boolean;
  showHeaderWhatsapp: boolean;
  showHeaderEmail: boolean;
  showHeaderSearch: boolean;
  showHeaderCart: boolean;
  showFooterPhone: boolean;
  showFooterWhatsapp: boolean;
  showFooterEmail: boolean;
  showFooterAddress: boolean;
  showFooterSocial: boolean;
  showContactPhone: boolean;
  showContactWhatsapp: boolean;
  showContactEmail: boolean;
  showHero: boolean;
  showGallery: boolean;
  showMenu: boolean;
  showProducts: boolean;
  showReviews: boolean;
  showBookings: boolean;
  showMap: boolean;
  storeName?: string;
  storeDescription?: string;
  storePhone?: string;
  storeEmail?: string;
  storeAddress?: string;
  logoUrl?: string;
  galleryImages?: string[];
}

// الحصول على الإعدادات
export const getStorefrontConfig = async (merchantId: string): Promise<StorefrontConfig> => {
  try {
    const response = await fetch(`${API_BASE}/${merchantId}`);
    if (!response.ok) throw new Error('فشل جلب الإعدادات');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('خطأ في جلب الإعدادات:', error);
    throw error;
  }
};

// حفظ الإعدادات
export const saveStorefrontConfig = async (
  merchantId: string,
  config: Partial<StorefrontConfig>
): Promise<StorefrontConfig> => {
  try {
    const response = await fetch(`${API_BASE}/${merchantId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    if (!response.ok) throw new Error('فشل حفظ الإعدادات');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('خطأ في حفظ الإعدادات:', error);
    throw error;
  }
};

// إعادة تعيين الإعدادات
export const resetStorefrontConfig = async (merchantId: string): Promise<StorefrontConfig> => {
  try {
    const response = await fetch(`${API_BASE}/${merchantId}/reset`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('فشل إعادة تعيين الإعدادات');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('خطأ في إعادة تعيين الإعدادات:', error);
    throw error;
  }
};

// رفع صورة البنر
export const uploadBannerImage = async (
  merchantId: string,
  file: File
): Promise<{ bannerImage: string }> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE}/${merchantId}/banner`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('فشل رفع الصورة');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('خطأ في رفع الصورة:', error);
    throw error;
  }
};

// رفع صور المعرض
export const uploadGalleryImages = async (
  merchantId: string,
  files: File[]
): Promise<{ galleryImages: string[] }> => {
  try {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    const response = await fetch(`${API_BASE}/${merchantId}/gallery`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('فشل رفع الصور');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('خطأ في رفع الصور:', error);
    throw error;
  }
};

// حذف صورة من المعرض
export const deleteGalleryImage = async (
  merchantId: string,
  imageIndex: number
): Promise<{ galleryImages: string[] }> => {
  try {
    const response = await fetch(`${API_BASE}/${merchantId}/gallery/${imageIndex}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('فشل حذف الصورة');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('خطأ في حذف الصورة:', error);
    throw error;
  }
};
