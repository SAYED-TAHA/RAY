/**
 * مخزون الصيدلية
 * إدارة مخزون الأدوية والمنتجات
 */

import React, { useState } from 'react';
import {
  Package, Search, Plus, Edit, Trash2, AlertTriangle,
  TrendingDown, BarChart3, Filter, Download, Eye, Settings2
} from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  price: number;
  expiryDate: string;
  supplier: string;
  lastRestockDate: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'expired';
}

const initialMedicines: Medicine[] = [
  {
    id: 'med-001',
    name: 'أموكسيسيلين 500mg',
    genericName: 'Amoxicillin',
    category: 'مضادات حيوية',
    quantity: 150,
    minStock: 50,
    maxStock: 500,
    price: 25,
    expiryDate: '2025-12-31',
    supplier: 'شركة الدواء الحديثة',
    lastRestockDate: '2024-11-15',
    status: 'in_stock'
  },
  {
    id: 'med-002',
    name: 'باراسيتامول 500mg',
    genericName: 'Paracetamol',
    category: 'مسكنات',
    quantity: 45,
    minStock: 100,
    maxStock: 300,
    price: 15,
    expiryDate: '2025-08-15',
    supplier: 'شركة الدواء الحديثة',
    lastRestockDate: '2024-10-20',
    status: 'low_stock'
  },
  {
    id: 'med-003',
    name: 'أسبرين 100mg',
    genericName: 'Aspirin',
    category: 'مسكنات',
    quantity: 0,
    minStock: 50,
    maxStock: 200,
    price: 10,
    expiryDate: '2025-06-30',
    supplier: 'شركة الدواء الحديثة',
    lastRestockDate: '2024-09-10',
    status: 'out_of_stock'
  },
  {
    id: 'med-004',
    name: 'ميتفورمين 500mg',
    genericName: 'Metformin',
    category: 'أدوية السكري',
    quantity: 200,
    minStock: 100,
    maxStock: 400,
    price: 30,
    expiryDate: '2024-12-15',
    supplier: 'شركة الدواء المتقدمة',
    lastRestockDate: '2024-11-01',
    status: 'expired'
  },
  {
    id: 'med-005',
    name: 'فيتامين C 500mg',
    genericName: 'Vitamin C',
    category: 'فيتامينات',
    quantity: 300,
    minStock: 100,
    maxStock: 500,
    price: 20,
    expiryDate: '2026-03-20',
    supplier: 'شركة الفيتامينات',
    lastRestockDate: '2024-11-20',
    status: 'in_stock'
  }
];

const PharmacyInventory: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock' | 'expired'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name.includes(searchTerm) || med.genericName.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || med.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || med.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(medicines.map(m => m.category)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in_stock': return 'متوفر';
      case 'low_stock': return 'مخزون منخفض';
      case 'out_of_stock': return 'غير متوفر';
      case 'expired': return 'منتهي الصلاحية';
      default: return status;
    }
  };

  const stats = {
    totalMedicines: medicines.length,
    inStock: medicines.filter(m => m.status === 'in_stock').length,
    lowStock: medicines.filter(m => m.status === 'low_stock').length,
    outOfStock: medicines.filter(m => m.status === 'out_of_stock').length,
    totalValue: medicines.reduce((sum, m) => sum + (m.quantity * m.price), 0)
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="w-6 h-6 text-green-600" />
            مخزون الصيدلية
          </h2>
          <p className="text-sm text-gray-500">إدارة مخزون الأدوية والمنتجات</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          <Plus className="w-5 h-5" />
          دواء جديد
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">إجمالي الأدوية</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalMedicines}</p>
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
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-700 mb-1">قيمة المخزون</p>
          <p className="text-2xl font-bold text-blue-900">{(stats.totalValue / 1000).toFixed(1)}K ج</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن دواء..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Category Filter */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="all">جميع الفئات</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="all">جميع الحالات</option>
          <option value="in_stock">متوفر</option>
          <option value="low_stock">مخزون منخفض</option>
          <option value="out_of_stock">غير متوفر</option>
          <option value="expired">منتهي الصلاحية</option>
        </select>
      </div>

      {/* Medicines Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">اسم الدواء</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الفئة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">المخزون</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">السعر</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الصلاحية</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMedicines.map(med => (
                <tr key={med.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{med.name}</p>
                      <p className="text-xs text-gray-500">{med.genericName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{med.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              med.quantity > med.maxStock * 0.75
                                ? 'bg-green-500'
                                : med.quantity > med.minStock
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min((med.quantity / med.maxStock) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-800 w-12 text-left">{med.quantity}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{med.price} ج</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{med.expiryDate}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(med.status)}`}>
                      {getStatusLabel(med.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
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

export default PharmacyInventory;
