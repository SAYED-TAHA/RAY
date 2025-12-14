/**
 * مدير الفروع
 * إدارة فروع المتجر والمبيعات
 */

import React, { useState } from 'react';
import {
  MapPin, Search, Plus, Edit, Trash2, Users, DollarSign,
  TrendingUp, Phone, Mail, Clock, AlertCircle, Eye
} from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  staff: number;
  sales: number;
  status: 'active' | 'inactive' | 'opening_soon';
  openingTime: string;
  closingTime: string;
  establishedDate: string;
}

const initialBranches: Branch[] = [
  {
    id: 'br-001',
    name: 'الفرع الرئيسي',
    location: 'القاهرة',
    address: 'شارع النيل، وسط البلد',
    phone: '+201001234567',
    email: 'cairo@example.com',
    manager: 'أحمد محمد',
    staff: 15,
    sales: 450000,
    status: 'active',
    openingTime: '09:00',
    closingTime: '22:00',
    establishedDate: '2020-01-15'
  },
  {
    id: 'br-002',
    name: 'فرع الجيزة',
    location: 'الجيزة',
    address: 'شارع الهرم، الجيزة',
    phone: '+201101234567',
    email: 'giza@example.com',
    manager: 'فاطمة علي',
    staff: 12,
    sales: 380000,
    status: 'active',
    openingTime: '10:00',
    closingTime: '23:00',
    establishedDate: '2021-06-20'
  },
  {
    id: 'br-003',
    name: 'فرع الإسكندرية',
    location: 'الإسكندرية',
    address: 'شارع البحر، الإسكندرية',
    phone: '+201201234567',
    email: 'alex@example.com',
    manager: 'محمود حسن',
    staff: 10,
    sales: 320000,
    status: 'active',
    openingTime: '09:30',
    closingTime: '21:30',
    establishedDate: '2022-03-10'
  },
  {
    id: 'br-004',
    name: 'فرع المنصورة',
    location: 'المنصورة',
    address: 'شارع الجمهورية، المنصورة',
    phone: '+201301234567',
    email: 'mansoura@example.com',
    manager: 'سارة أحمد',
    staff: 8,
    sales: 250000,
    status: 'opening_soon',
    openingTime: '10:00',
    closingTime: '22:00',
    establishedDate: '2025-01-01'
  }
];

const BranchesManager: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'opening_soon'>('all');
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.name.includes(searchTerm) || branch.location.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || branch.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'opening_soon': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'opening_soon': return 'قريباً';
      default: return status;
    }
  };

  const stats = {
    total: branches.length,
    active: branches.filter(b => b.status === 'active').length,
    totalSales: branches.reduce((sum, b) => sum + b.sales, 0),
    totalStaff: branches.reduce((sum, b) => sum + b.staff, 0)
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-orange-600" />
            إدارة الفروع
          </h2>
          <p className="text-sm text-gray-500">إدارة فروع المتجر والمبيعات</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
          <Plus className="w-5 h-5" />
          فرع جديد
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">إجمالي الفروع</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <p className="text-sm text-green-700 mb-1">فروع نشطة</p>
          <p className="text-2xl font-bold text-green-900">{stats.active}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-700 mb-1">إجمالي المبيعات</p>
          <p className="text-2xl font-bold text-blue-900">{(stats.totalSales / 1000000).toFixed(1)}M</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
          <p className="text-sm text-purple-700 mb-1">إجمالي الموظفين</p>
          <p className="text-2xl font-bold text-purple-900">{stats.totalStaff}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن فرع..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
          <option value="opening_soon">قريباً</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branches List */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBranches.map(branch => (
            <button
              key={branch.id}
              onClick={() => setSelectedBranch(branch)}
              className={`p-4 rounded-xl border-2 transition text-left ${
                selectedBranch?.id === branch.id
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-800">{branch.name}</h4>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(branch.status)}`}>
                  {getStatusLabel(branch.status)}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                <MapPin className="w-3 h-3" />
                {branch.location}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1 text-gray-600">
                  <Users className="w-3 h-3" />
                  {branch.staff} موظف
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <DollarSign className="w-3 h-3" />
                  {(branch.sales / 1000).toFixed(0)}K
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Branch Details */}
        {selectedBranch && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800 mb-1">{selectedBranch.name}</h3>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(selectedBranch.status)}`}>
                {getStatusLabel(selectedBranch.status)}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Location */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">الموقع</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-3 h-3" />
                    {selectedBranch.address}
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">جهات الاتصال</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-3 h-3" />
                    {selectedBranch.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-3 h-3" />
                    {selectedBranch.email}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">التفاصيل</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المدير:</span>
                    <span className="font-semibold text-gray-800">{selectedBranch.manager}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الموظفين:</span>
                    <span className="font-semibold text-gray-800">{selectedBranch.staff}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">المبيعات:</span>
                    <span className="font-semibold text-gray-800">{(selectedBranch.sales / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  ساعات العمل
                </h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">من:</span>
                    <span className="font-semibold text-gray-800">{selectedBranch.openingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">إلى:</span>
                    <span className="font-semibold text-gray-800">{selectedBranch.closingTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-200 space-y-2">
              <button className="w-full px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-semibold flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                تعديل
              </button>
              <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-semibold flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" />
                حذف
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BranchesManager;
