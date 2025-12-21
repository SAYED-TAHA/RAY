import { API_URL } from '@/utils/api';
import type { Product as ApiProduct } from './productsService';
import {
  getDataMode,
  localCreateProduct,
  localDeleteProduct,
  localListProducts,
  localUpdateProduct
} from './localDataStore';

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

const toApiProduct = (p: Product): Omit<ApiProduct, '_id' | 'createdAt' | 'updatedAt'> & { _id?: string; createdAt?: string; updatedAt?: string } => {
  const status = p.status === 'discontinued' ? 'inactive' : p.status;
  return {
    _id: String(p.id),
    name: p.name,
    price: Number(p.price ?? 0),
    barcode: p.barcode,
    sku: p.sku,
    category: p.category,
    image: p.image,
    stock: Number(p.stock ?? 0),
    minStock: Number(p.minStock ?? 0),
    status: status as any,
    dailySales: Number(p.dailySales ?? 0),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: p.description,
    cost: Number(p.cost ?? 0),
    model3d: p.model3d
  } as any;
};

const fromApiProduct = (p: any): Product => {
  return {
    id: String(p?._id ?? p?.id ?? ''),
    name: String(p?.name ?? ''),
    category: String(p?.category ?? ''),
    description: String(p?.description ?? ''),
    price: Number(p?.price ?? 0),
    cost: Number(p?.cost ?? 0),
    stock: Number(p?.stock ?? 0),
    minStock: Number(p?.minStock ?? 0),
    sku: String(p?.sku ?? ''),
    barcode: String(p?.barcode ?? ''),
    status: (p?.status as any) || 'active',
    image: String(p?.image ?? ''),
    model3d: p?.model3d,
    dailySales: Number(p?.dailySales ?? 0)
  };
};

export async function fetchProducts(): Promise<Product[]> {
  try {
    if (getDataMode() === 'local') {
      const res = await localListProducts({ page: 1, limit: 1000 });
      return (res.products || []).map(fromApiProduct);
    }

    const response = await fetch(`${API_URL}/api/products`);
    if (!response.ok) throw new Error('فشل جلب المنتجات');
    const data = await response.json();
    return Array.isArray(data) ? data.map(fromApiProduct) : (data?.products || []).map(fromApiProduct);
  } catch (error) {
    console.error('خطأ في جلب المنتجات:', error);
    const res = await localListProducts({ page: 1, limit: 1000 });
    return (res.products || []).map(fromApiProduct);
  }
}

export async function saveProduct(product: Product): Promise<Product> {
  try {
    if (getDataMode() === 'local') {
      const created = await localCreateProduct(toApiProduct(product) as any);
      return fromApiProduct(created);
    }

    const response = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('فشل حفظ المنتج');
    return fromApiProduct(await response.json());
  } catch (error) {
    console.error('خطأ في حفظ المنتج:', error);
    const created = await localCreateProduct(toApiProduct(product) as any);
    return fromApiProduct(created);
  }
}

export async function updateProduct(product: Product): Promise<Product> {
  try {
    if (getDataMode() === 'local') {
      const updated = await localUpdateProduct(String(product.id), toApiProduct(product) as any);
      return fromApiProduct(updated || toApiProduct(product));
    }

    const response = await fetch(`${API_URL}/api/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('فشل تحديث المنتج');
    return fromApiProduct(await response.json());
  } catch (error) {
    console.error('خطأ في تحديث المنتج:', error);
    const updated = await localUpdateProduct(String(product.id), toApiProduct(product) as any);
    return fromApiProduct(updated || toApiProduct(product));
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    if (getDataMode() === 'local') {
      await localDeleteProduct(String(id));
      return;
    }

    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('فشل حذف المنتج');
  } catch (error) {
    console.error('خطأ في حذف المنتج:', error);
    await localDeleteProduct(String(id));
  }
}
