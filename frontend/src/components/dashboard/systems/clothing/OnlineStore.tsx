/**
 * المتجر الإلكتروني
 * إدارة المتجر الإلكتروني والمبيعات
 */

import React, { useState } from 'react';
import {
  ShoppingCart, Search, Plus, Edit, Trash2, Eye, TrendingUp,
  Star, DollarSign, Package, AlertCircle, CheckCircle
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  reviews: number;
  views: number;
  sales: number;
  status: 'active' | 'inactive' | 'out_of_stock';
}

const initialProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'فستان صيفي',
    category: 'فساتين',
    price: 250,
    stock: 45,
    rating: 4.8,
    reviews: 120,
    views: 1250,
    sales: 85,
    status: 'active'
  },
  {
    id: 'prod-002',
    name: 'بنطال جينز',
    category: 'بناطيل',
    price: 180,
    stock: 0,
    rating: 4.6,
    reviews: 95,
    views: 890,
    sales: 120,
    status: 'out_of_stock'
  },
  {
    id: 'prod-003',
    name: 'قميص كاجوال',
    category: 'قمصان',
    price: 150,
    stock: 30,
    rating: 4.7,
    reviews: 78,
    views: 650,
    sales: 45,
    status: 'active'
  }
];

const OnlineStore: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'out_of_stock'>('all');

  const filteredProducts = products.filter(prod => {
    const matchesSearch = prod.name.includes(searchTerm) || prod.category.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || prod.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalProducts: products.length,
    active: products.filter(p => p.status === 'active').length,
    totalSales: products.reduce((sum, p) => sum + p.sales, 0),
    totalViews: products.reduce((sum, p) => sum + p.views, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-purple-600" />
            المتجر الإلكتروني
          </h2>
          <p className="text-sm text-gray-500">إدارة المتجر الإلكتروني والمبيعات</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          <Plus className="w-5 h-5" />
          منتج جديد
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">إجمالي المنتجات</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <p className="text-sm text-green-700 mb-1">منتجات نشطة</p>
          <p className="text-2xl font-bold text-green-900">{stats.active}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-700 mb-1">إجمالي المبيعات</p>
          <p className="text-2xl font-bold text-blue-900">{stats.totalSales}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
          <p className="text-sm text-purple-700 mb-1">المشاهدات</p>
          <p className="text-2xl font-bold text-purple-900">{stats.totalViews.toLocaleString()}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
          <option value="out_of_stock">غير متوفر</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">المنتج</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">السعر</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">المخزون</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">التقييم</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">المبيعات</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map(prod => (
                <tr key={prod.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{prod.name}</p>
                      <p className="text-xs text-gray-500">{prod.category}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{prod.price} ج</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{prod.stock}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold">{prod.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{prod.sales}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(prod.status)}`}>
                      {prod.status === 'active' ? 'نشط' : prod.status === 'inactive' ? 'غير نشط' : 'غير متوفر'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-red-100 rounded transition">
                        <Trash2 className="w-4 h-4 text-red-600" />
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
  );
};

export default OnlineStore;
