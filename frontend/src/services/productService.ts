import { API_URL } from '@/utils/api';

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  sku: string;
  barcode: string;
  status: 'active' | 'inactive' | 'discontinued';
  image: string;
  model3d?: string;
  dailySales?: number;
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/api/products`);
    if (!response.ok) throw new Error('فشل جلب المنتجات');
    return await response.json();
  } catch (error) {
    console.error('خطأ في جلب المنتجات:', error);
    return [];
  }
}

export async function saveProduct(product: Product): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('فشل حفظ المنتج');
    return await response.json();
  } catch (error) {
    console.error('خطأ في حفظ المنتج:', error);
    throw error;
  }
}

export async function updateProduct(product: Product): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/api/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('فشل تحديث المنتج');
    return await response.json();
  } catch (error) {
    console.error('خطأ في تحديث المنتج:', error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('فشل حذف المنتج');
  } catch (error) {
    console.error('خطأ في حذف المنتج:', error);
    throw error;
  }
}
