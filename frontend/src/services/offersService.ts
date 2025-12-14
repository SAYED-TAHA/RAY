/**
 * خدمة العروض المميزة
 * التواصل مع API للحصول على العروض والتعامل معها
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Offer {
  id: string;
  title: string;
  shop: string;
  image: string;
  price: string;
  oldPrice?: string;
  rating: number;
  tag?: string;
}

/**
 * جلب العروض المميزة
 */
export const fetchFeaturedOffers = async (): Promise<Offer[]> => {
  try {
    const response = await fetch(`${API_URL}/api/offers/featured`);
    if (!response.ok) {
      throw new Error('فشل جلب العروض');
    }
    return await response.json();
  } catch (error) {
    console.error('خطأ في جلب العروض:', error);
    return [];
  }
};

/**
 * جلب عرض واحد
 */
export const fetchOffer = async (id: string): Promise<Offer | null> => {
  try {
    const response = await fetch(`${API_URL}/api/offers/${id}`);
    if (!response.ok) {
      throw new Error('فشل جلب العرض');
    }
    return await response.json();
  } catch (error) {
    console.error('خطأ في جلب العرض:', error);
    return null;
  }
};

/**
 * إضافة عرض جديد
 */
export const createOffer = async (offer: Omit<Offer, 'id'>): Promise<Offer | null> => {
  try {
    const response = await fetch(`${API_URL}/api/offers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offer)
    });
    if (!response.ok) {
      throw new Error('فشل إضافة العرض');
    }
    return await response.json();
  } catch (error) {
    console.error('خطأ في إضافة العرض:', error);
    return null;
  }
};

/**
 * تحديث عرض
 */
export const updateOffer = async (id: string, offer: Partial<Offer>): Promise<Offer | null> => {
  try {
    const response = await fetch(`${API_URL}/api/offers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offer)
    });
    if (!response.ok) {
      throw new Error('فشل تحديث العرض');
    }
    return await response.json();
  } catch (error) {
    console.error('خطأ في تحديث العرض:', error);
    return null;
  }
};

/**
 * حذف عرض
 */
export const deleteOffer = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/api/offers/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('فشل حذف العرض');
    }
    return true;
  } catch (error) {
    console.error('خطأ في حذف العرض:', error);
    return false;
  }
};
