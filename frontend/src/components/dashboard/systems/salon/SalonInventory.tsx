/**
 * مخزون الصالون
 * إدارة منتجات الصالون والمستحضرات
 */

import React, { useState } from 'react';
import {
  Package, Search, Plus, Edit, Trash2, AlertCircle,
  TrendingDown, DollarSign, Eye, Filter
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  supplier: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

const initialProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'شامبو فاخر',
    category: 'العناية بالشعر',
    stock: 45,
    minStock: 10,
    price: 85,
    supplier: 'شركة الجمال',
    status: 'in_stock'
  },
  {
    id: 'prod-002',
    name: 'بلسم مرطب',
    category: 'العناية بالشعر',
    stock: 8,
    minStock: 10,
    price: 75,
    supplier: 'شركة الجمال',
    status: 'low_stock'
  },
  {
    id: 'prod-003',
    name: 'صبغة شعر',
    category: 'الصبغات',
    stock: 0,
    minStock: 5,
    price: 120,
    supplier: 'شركة الألوان',
    status: 'out_of_stock'
  },
  {
    id: 'prod-004',
    name: 'جل تثبيت',
    category: 'منتجات التثبيت',
    stock: 32,
    minStock: 8,
    price: 65,
    supplier: 'شركة الجمال',
    status: 'in_stock'
  }
];

const SalonInventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');

  const filteredProducts = products.filter(prod => {
    const matchesSearch = prod.name.includes(searchTerm) || prod.category.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || prod.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in_stock': return 'متوفر';
      case 'low_stock': return 'مخزون منخفض';
      case 'out_of_stock': return 'غير متوفر';
      default: return status;
    }
  };

  const stats = {
    total: products.length,
    inStock: products.filter(p => p.status === 'in_stock').length,
    lowStock: products.filter(p => p.status === 'low_stock').length,
    outOfStock: products.filter(p => p.status === 'out_of_stock').length
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="w-6 h-6 text-pink-600" />
            مخزون الصالون
          </h2>
          <p className="text-sm text-gray-500">إدارة منتجات الصالون والمستحضرات</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
          <Plus className="w-5 h-5" />
          منتج جديد
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">إجمالي المنتجات</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <p className="text-sm text-green-700 mb-1">متوفر</p>
          <p className="text-2xl font-bold text-green-900">{stats.inStock}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
          <p className="text-sm text-yellow-700 mb-1">مخزون منخفض</p>
          <p className="text-2xl font-bold text-yellow-900">{stats.lowStock}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-200">
          <p className="text-sm text-red-700 mb-1">غير متوفر</p>
          <p className="text-2xl font-bold text-red-900">{stats.outOfStock}</p>
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
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
        >
          <option value="all">جميع الحالات</option>
          <option value="in_stock">متوفر</option>
          <option value="low_stock">مخزون منخفض</option>
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
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الفئة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">المخزون</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">السعر</th>
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
                      <p className="text-xs text-gray-500">{prod.supplier}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{prod.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className={prod.stock < prod.minStock ? 'text-red-600 font-semibold' : ''}>
                      {prod.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{prod.price} ج</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(prod.status)}`}>
                      {getStatusLabel(prod.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition">
                        <Edit className="w-4 h-4 text-pink-600" />
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

export default SalonInventory;
