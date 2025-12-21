/**
 * خدمة إدارة المنتجات
 * التواصل مع API للحصول على المنتجات والتعامل معها
 */

import { API_URL } from '@/utils/api';
import {
  getDataMode,
  localCreateProduct,
  localDeleteProduct,
  localFetchProduct,
  localListProducts,
  localUpdateProduct
} from './localDataStore';

const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  const storedTokens = localStorage.getItem('authTokens');
  if (storedTokens) {
    try {
      const parsed = JSON.parse(storedTokens);
      if (parsed?.accessToken) return parsed.accessToken;
    } catch {
      // ignore
    }
  }
  return localStorage.getItem('authToken');
};

export interface Product {
  _id: string;
  name: string;
  price: number;
  barcode?: string;
  sku?: string;
  category?: string;
  image?: string;
  description?: string;
  tags?: string[];
  stock: number;
  minStock: number;
  status: 'active' | 'inactive';
  dailySales: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * جلب كل المنتجات
 */
export const fetchProducts = async (options?: {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  minStock?: number;
}): Promise<{ products: Product[]; pagination: any }> => {
  try {
    if (getDataMode() === 'local') {
      return await localListProducts(options);
    }

    const params = new URLSearchParams();
    if (options?.page) params.append('page', options.page.toString());
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.category) params.append('category', options.category);
    if (options?.status) params.append('status', options.status);
    if (options?.minStock !== undefined) params.append('minStock', options.minStock.toString());

    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/products?${params}`, { headers });
    if (!response.ok) {
      throw new Error('فشل جلب المنتجات');
    }
    return await response.json();
  } catch (error) {
    console.error('خطأ في جلب المنتجات:', error);
    return await localListProducts(options);
  }
};

/**
 * جلب منتج واحد
 */
export const fetchProduct = async (id: string): Promise<Product | null> => {
  try {
    if (getDataMode() === 'local') {
      return await localFetchProduct(id);
    }

    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/products/${id}`, { headers });
    if (!response.ok) {
      throw new Error('فشل جلب المنتج');
    }
    return await response.json();
  } catch (error) {
    console.error('خطأ في جلب المنتج:', error);
    return await localFetchProduct(id);
  }
};

/**
 * إضافة منتج جديد
 */
export const createProduct = async (product: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<Product | null> => {
  try {
    if (getDataMode() === 'local') {
      return await localCreateProduct(product);
    }

    const token = getAccessToken();
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers,
      body: JSON.stringify(product)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل إضافة المنتج');
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في إضافة المنتج:', error);
    return await localCreateProduct(product);
  }
};

/**
 * تحديث منتج
 */
export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product | null> => {
  try {
    if (getDataMode() === 'local') {
      return await localUpdateProduct(id, product);
    }

    const token = getAccessToken();
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(product)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل تحديث المنتج');
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في تحديث المنتج:', error);
    return await localUpdateProduct(id, product);
  }
};

/**
 * حذف منتج
 */
export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    if (getDataMode() === 'local') {
      return await localDeleteProduct(id);
    }

    const token = getAccessToken();
    const headers: HeadersInit = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'DELETE',
      headers
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل حذف المنتج');
    }
    
    return true;
  } catch (error) {
    console.error('خطأ في حذف المنتج:', error);
    return await localDeleteProduct(id);
  }
};
