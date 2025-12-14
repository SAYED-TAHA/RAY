'use client';

import React, { useState, useEffect } from 'react';
import { 
  Package, Search, Filter, Download, Eye, Edit, Trash2,
  Plus, DollarSign, TrendingUp, TrendingDown, Star,
  Image, Tag, Store, AlertCircle, CheckCircle, XCircle,
  BarChart3, Heart, ShoppingCart, Box, Archive, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { fetchProducts, deleteProduct, Product } from '../../../services/productsService';
import AddProductModal from '../../../components/admin/AddProductModal';
import AdvancedSearch from '../../../components/AdvancedSearch';
import { SearchResult } from '../../../services/searchService';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchAnalytics, setSearchAnalytics] = useState<SearchResult['analytics'] | null>(null);

  // Handle search results
  const handleSearchResults = (results: SearchResult) => {
    setProducts(results.products);
    setSearchAnalytics(results.analytics);
    setLoading(false);
  };

  // Load initial products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to load products:', error);
        alert('فشل تحميل المنتجات. يرجى المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Refresh products after adding/deleting
  const refreshProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data.products);
    } catch (error) {
      console.error('Failed to refresh products:', error);
      alert('فشل تحديث المنتجات. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        await deleteProduct(id);
        refreshProducts();
      } catch (error: any) {
        console.error('Failed to delete product:', error);
        alert(error.message || 'فشل حذف المنتج');
      }
    }
  };

  // Products are now filtered by the advanced search component

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'inactive':
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
      default:
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      default: return status;
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return 'text-red-600 font-bold';
    if (stock < 10) return 'text-yellow-600 font-bold';
    return 'text-green-600 font-bold';
  };

  const getStockLabel = (stock: number) => {
    if (stock === 0) return 'نفد';
    if (stock < 10) return `${stock} (منخفض)`;
    return `${stock}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition">
                ← لوحة التحكم
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">المنتجات</h1>
              <span className="bg-ray-blue text-white px-3 py-1 rounded-full text-sm font-bold">
                {products.length}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-ray-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة منتج
              </button>
              <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                تصدير
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {products.filter(p => p.status === 'active').length}
            </span>
          </div>
          <h3 className="text-sm text-gray-600">منتجات نشطة</h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {products.filter(p => p.stock === 0).length}
            </span>
          </div>
          <h3 className="text-sm text-gray-600">نفد المخزون</h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {products.filter(p => p.stock < 10 && p.stock > 0).length}
            </span>
          </div>
          <h3 className="text-sm text-gray-600">مخزون منخفض</h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {products.reduce((sum, p) => sum + p.dailySales, 0)}
            </span>
          </div>
          <h3 className="text-sm text-gray-600">إجمالي المبيعات</h3>
        </div>
      </div>

      {/* Advanced Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <AdvancedSearch onSearchResults={handleSearchResults} placeholder="ابحث عن المنتجات بالاسم، SKU، أو الكلمات المفتاحية..." />
          
          {/* Search Analytics */}
          {searchAnalytics && (
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <span>وجدت {searchAnalytics.totalResults} منتج</span>
                <span>وقت البحث: {searchAnalytics.searchTime}ms</span>
                {searchAnalytics.filters.length > 0 && (
                  <span>فلاتر: {searchAnalytics.filters.join(', ')}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-ray-blue" />
            <span className="mr-2 text-gray-600">جاري تحميل المنتجات...</span>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المنتج
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      السعر
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المخزون
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المبيعات اليومية
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      إجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        لا توجد منتجات حالياً
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center mr-3">
                              {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full rounded-lg object-cover" />
                              ) : (
                                <Image className="w-6 h-6 text-gray-600" />
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.category || 'غير محدد'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.sku || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {product.price.toLocaleString()} ج.م
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${getStockStatus(product.stock)}`}>
                            {getStockLabel(product.stock)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.dailySales}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={getStatusBadge(product.status)}>
                            {getStatusLabel(product.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button className="text-ray-blue hover:text-blue-600 transition">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900 transition">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product._id)}
                              className="text-red-600 hover:text-red-700 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onProductAdded={refreshProducts}
      />
    </div>
  );
}
