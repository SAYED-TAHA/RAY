'use client';

import React, { useState } from 'react';
import { 
  Package, Search, Filter, Download, Eye, Edit, Trash2,
  Plus, DollarSign, TrendingUp, TrendingDown, Star,
  Image, Tag, Store, AlertCircle, CheckCircle, XCircle,
  BarChart3, Heart, ShoppingCart, Box, Archive
} from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  sold: number;
  rating: number;
  reviews: number;
  status: 'active' | 'inactive' | 'out_of_stock' | 'draft';
  shop: string;
  image?: string;
  description?: string;
  sku: string;
  created: string;
  lastUpdated: string;
  views: number;
  likes: number;
}

export default function AdminProducts() {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'جهاز لابتوب Dell XPS 13',
      category: 'إلكترونيات',
      price: 15999,
      originalPrice: 18999,
      stock: 15,
      sold: 45,
      rating: 4.8,
      reviews: 23,
      status: 'active',
      shop: 'متجر التقنية',
      sku: 'DELL-XPS13-001',
      created: '2024-11-01',
      lastUpdated: '2024-12-01',
      views: 1234,
      likes: 89
    },
    {
      id: '2',
      name: 'هاتف iPhone 15 Pro',
      category: 'هواتف',
      price: 25999,
      stock: 8,
      sold: 67,
      rating: 4.9,
      reviews: 45,
      status: 'active',
      shop: 'موبايل مول',
      sku: 'IPHONE15-PRO-256',
      created: '2024-10-15',
      lastUpdated: '2024-11-28',
      views: 3456,
      likes: 234
    },
    {
      id: '3',
      name: 'ساعة ذكية Apple Watch Series 9',
      category: 'إكسسوارات',
      price: 8999,
      stock: 0,
      sold: 23,
      rating: 4.7,
      reviews: 12,
      status: 'out_of_stock',
      shop: 'موبايل مول',
      sku: 'WATCH-S9-45MM',
      created: '2024-10-20',
      lastUpdated: '2024-12-02',
      views: 890,
      likes: 56
    },
    {
      id: '4',
      name: 'سماعات AirPods Pro 2',
      category: 'إكسسوارات',
      price: 4999,
      stock: 25,
      sold: 89,
      rating: 4.6,
      reviews: 34,
      status: 'active',
      shop: 'موبايل مول',
      sku: 'AIRPODS-PRO2',
      created: '2024-09-10',
      lastUpdated: '2024-11-25',
      views: 2345,
      likes: 178
    },
    {
      id: '5',
      name: 'كاميرا Canon EOS R6',
      category: 'تصوير',
      price: 45000,
      stock: 3,
      sold: 12,
      rating: 5.0,
      reviews: 8,
      status: 'active',
      shop: 'التصوير الاحترافي',
      sku: 'CANON-EOSR6',
      created: '2024-08-15',
      lastUpdated: '2024-11-30',
      views: 567,
      likes: 45
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.shop.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'inactive':
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'out_of_stock':
        return 'bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold';
      default:
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'out_of_stock': return 'نفد المخزون';
      case 'draft': return 'مسودة';
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
                {filteredProducts.length}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="bg-ray-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
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
              {products.filter(p => p.status === 'out_of_stock').length}
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
              {products.reduce((sum, p) => sum + p.sold, 0)}
            </span>
          </div>
          <h3 className="text-sm text-gray-600">إجمالي المبيعات</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="بحث بالاسم، SKU، أو المتجر..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
            >
              <option value="all">كل الفئات</option>
              <option value="إلكترونيات">إلكترونيات</option>
              <option value="هواتف">هواتف</option>
              <option value="إكسسوارات">إكسسوارات</option>
              <option value="تصوير">تصوير</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
            >
              <option value="all">كل الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
              <option value="out_of_stock">نفد المخزون</option>
              <option value="draft">مسودة</option>
            </select>
            
            <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <Filter className="w-4 h-4" />
              فلاتر متقدمة
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="p-6">
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
                    المبيعات
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التقييم
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
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center mr-3">
                          <Image className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.category}</div>
                          <div className="text-xs text-gray-400">{product.shop}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.price.toLocaleString()} ج.م
                        </div>
                        {product.originalPrice && (
                          <div className="text-xs text-gray-500 line-through">
                            {product.originalPrice.toLocaleString()} ج.م
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${getStockStatus(product.stock)}`}>
                        {getStockLabel(product.stock)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.sold}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-900">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
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
                        <button className="text-red-600 hover:text-red-700 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
