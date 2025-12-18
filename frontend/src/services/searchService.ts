/**
 * خدمة البحث المتقدم مع الكلمات المفتاحية وتحسين محركات البحث
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface SearchOptions {
  query: string;
  category?: string;
  status?: string;
  priceRange?: { min: number; max: number };
  stockRange?: { min: number; max: number };
  sortBy?: 'name' | 'price' | 'stock' | 'createdAt' | 'dailySales';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface SearchResult {
  products: any[];
  pagination: {
    current: number;
    pages: number;
    total: number;
    limit: number;
  };
  suggestions?: string[];
  analytics?: {
    searchTime: number;
    totalResults: number;
    filters: string[];
  };
}

export interface KeywordSuggestion {
  keyword: string;
  count: number;
  category?: string;
}

/**
 * بحث متقدم في المنتجات
 */
export const searchProducts = async (options: SearchOptions): Promise<SearchResult> => {
  try {
    const params = new URLSearchParams();
    
    // إضافة معلمات البحث
    params.append('q', options.query);
    if (options.category) params.append('category', options.category);
    if (options.status) params.append('status', options.status);
    if (options.priceRange) {
      params.append('minPrice', options.priceRange.min.toString());
      params.append('maxPrice', options.priceRange.max.toString());
    }
    if (options.stockRange) {
      params.append('minStock', options.stockRange.min.toString());
      params.append('maxStock', options.stockRange.max.toString());
    }
    if (options.sortBy) params.append('sortBy', options.sortBy);
    if (options.sortOrder) params.append('sortOrder', options.sortOrder);
    if (options.page) params.append('page', options.page.toString());
    if (options.limit) params.append('limit', options.limit.toString());

    const response = await fetch(`${API_URL}/api/search?${params}`);
    if (!response.ok) {
      throw new Error('فشل البحث عن المنتجات');
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في البحث:', error);
    return {
      products: [],
      pagination: { current: 1, pages: 0, total: 0, limit: 20 },
      suggestions: [],
      analytics: { searchTime: 0, totalResults: 0, filters: [] }
    };
  }
};

/**
 * الحصول على اقتراحات الكلمات المفتاحية
 */
export const getKeywordSuggestions = async (query: string): Promise<KeywordSuggestion[]> => {
  try {
    const response = await fetch(`${API_URL}/api/search/suggestions?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('فشل جلب الاقتراحات');
    }
    return await response.json();
  } catch (error) {
    console.error('خطأ في جلب الاقتراحات:', error);
    return [];
  }
};

/**
 * تحليل الكلمات المفتاحية الشائعة
 */
export const getPopularKeywords = async (limit: number = 10): Promise<KeywordSuggestion[]> => {
  try {
    const response = await fetch(`${API_URL}/api/search/keywords/popular?limit=${limit}`);
    if (!response.ok) {
      throw new Error('فشل جلب الكلمات الشائعة');
    }
    return await response.json();
  } catch (error) {
    console.error('خطأ في جلب الكلمات الشائعة:', error);
    return [];
  }
};

/**
 * تحسين SEO للمنتجات
 */
export const generateSEOKeywords = (product: {
  name: string;
  category?: string;
  description?: string;
  price: number;
}): string[] => {
  const keywords: string[] = [];
  
  // كلمات مفتاحية من اسم المنتج
  const nameWords = product.name.toLowerCase().split(' ');
  keywords.push(...nameWords);
  
  // كلمات مفتاحية من الفئة
  if (product.category) {
    keywords.push(product.category.toLowerCase());
  }
  
  // كلمات مفتاحية من الوصف
  if (product.description) {
    const descWords = product.description.toLowerCase().split(' ').filter(word => word.length > 3);
    keywords.push(...descWords.slice(0, 5)); // أول 5 كلمات فقط
  }
  
  // كلمات مفتاحية للسعر
  if (product.price < 100) keywords.push('رخيص', 'منخفض السعر');
  else if (product.price > 1000) keywords.push('فاخر', 'غالي');
  keywords.push(`${product.price} ج.م`);
  
  // إزالة التكرار والفلترة
  return Array.from(new Set(keywords.filter(word => word.length > 2)));
};

/**
 * تتبع تحليلات البحث
 */
export const trackSearch = async (query: string, results: number, userId?: string) => {
  try {
    await fetch(`${API_URL}/api/analytics/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        results,
        userId,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      })
    });
  } catch (error) {
    console.error('خطأ في تتبع البحث:', error);
  }
};
