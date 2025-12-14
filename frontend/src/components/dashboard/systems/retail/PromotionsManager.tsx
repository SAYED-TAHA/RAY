/**
 * مدير العروض والخصومات
 * إدارة العروض الترويجية والخصومات
 */

import React, { useState } from 'react';
import {
  Tag, Search, Plus, Edit, Trash2, Calendar, Percent,
  TrendingUp, Eye, Filter, AlertCircle, CheckCircle, Clock
} from 'lucide-react';

interface Promotion {
  id: string;
  name: string;
  type: 'discount' | 'buy_one_get_one' | 'bundle' | 'seasonal';
  description: string;
  discountValue: number;
  discountType: 'percentage' | 'fixed';
  startDate: string;
  endDate: string;
  status: 'active' | 'scheduled' | 'expired' | 'paused';
  applicableProducts: number;
  usageCount: number;
  totalSavings: number;
  minPurchase?: number;
}

const initialPromotions: Promotion[] = [
  {
    id: 'promo-001',
    name: 'خصم الجمعة السوداء',
    type: 'discount',
    description: 'خصم 50% على جميع المنتجات',
    discountValue: 50,
    discountType: 'percentage',
    startDate: '2024-11-25',
    endDate: '2024-12-02',
    status: 'active',
    applicableProducts: 150,
    usageCount: 1250,
    totalSavings: 125000,
    minPurchase: 100
  },
  {
    id: 'promo-002',
    name: 'اشتر واحد واحصل على واحد مجاني',
    type: 'buy_one_get_one',
    description: 'على المنتجات المختارة',
    discountValue: 100,
    discountType: 'percentage',
    startDate: '2024-11-20',
    endDate: '2024-12-10',
    status: 'active',
    applicableProducts: 45,
    usageCount: 320,
    totalSavings: 45000
  },
  {
    id: 'promo-003',
    name: 'عرض الحزم',
    type: 'bundle',
    description: 'احصل على 3 منتجات بسعر 2',
    discountValue: 33,
    discountType: 'percentage',
    startDate: '2024-11-15',
    endDate: '2024-12-15',
    status: 'active',
    applicableProducts: 30,
    usageCount: 450,
    totalSavings: 67500,
    minPurchase: 200
  },
  {
    id: 'promo-004',
    name: 'عرض نهاية السنة',
    type: 'seasonal',
    description: 'خصم خاص لنهاية السنة',
    discountValue: 30,
    discountType: 'percentage',
    startDate: '2024-12-20',
    endDate: '2024-12-31',
    status: 'scheduled',
    applicableProducts: 200,
    usageCount: 0,
    totalSavings: 0
  }
];

const PromotionsManager: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'scheduled' | 'expired' | 'paused'>('all');
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);

  const filteredPromotions = promotions.filter(promo => {
    const matchesSearch = promo.name.includes(searchTerm) || promo.description.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || promo.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'scheduled': return 'مجدول';
      case 'expired': return 'منتهي';
      case 'paused': return 'موقوف';
      default: return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'discount': return 'خصم';
      case 'buy_one_get_one': return 'اشتر واحد';
      case 'bundle': return 'حزمة';
      case 'seasonal': return 'موسمي';
      default: return type;
    }
  };

  const stats = {
    total: promotions.length,
    active: promotions.filter(p => p.status === 'active').length,
    totalUsage: promotions.reduce((sum, p) => sum + p.usageCount, 0),
    totalSavings: promotions.reduce((sum, p) => sum + p.totalSavings, 0)
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Tag className="w-6 h-6 text-red-600" />
            إدارة العروض والخصومات
          </h2>
          <p className="text-sm text-gray-500">إدارة العروض الترويجية والخصومات</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
          <Plus className="w-5 h-5" />
          عرض جديد
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">إجمالي العروض</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <p className="text-sm text-green-700 mb-1">عروض نشطة</p>
          <p className="text-2xl font-bold text-green-900">{stats.active}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-700 mb-1">إجمالي الاستخدام</p>
          <p className="text-2xl font-bold text-blue-900">{stats.totalUsage.toLocaleString()}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
          <p className="text-sm text-purple-700 mb-1">إجمالي التوفير</p>
          <p className="text-2xl font-bold text-purple-900">{(stats.totalSavings / 1000).toFixed(0)}K</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن عرض..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500"
        >
          <option value="all">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="scheduled">مجدول</option>
          <option value="expired">منتهي</option>
          <option value="paused">موقوف</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Promotions List */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPromotions.map(promo => (
            <button
              key={promo.id}
              onClick={() => setSelectedPromotion(promo)}
              className={`p-4 rounded-xl border-2 transition text-left ${
                selectedPromotion?.id === promo.id
                  ? 'border-red-600 bg-red-50'
                  : 'border-gray-200 hover:border-red-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{promo.name}</h4>
                  <p className="text-xs text-gray-500">{getTypeLabel(promo.type)}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(promo.status)}`}>
                  {getStatusLabel(promo.status)}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Percent className="w-4 h-4 text-red-600" />
                <span className="font-bold text-lg text-red-600">
                  {promo.discountValue}{promo.discountType === 'percentage' ? '%' : ' ج'}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {promo.usageCount} استخدام
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {(promo.totalSavings / 1000).toFixed(0)}K توفير
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Promotion Details */}
        {selectedPromotion && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800 mb-1">{selectedPromotion.name}</h3>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(selectedPromotion.status)}`}>
                {getStatusLabel(selectedPromotion.status)}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Description */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-1 text-sm">الوصف</h4>
                <p className="text-xs text-gray-600">{selectedPromotion.description}</p>
              </div>

              {/* Discount */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">الخصم</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">القيمة:</span>
                    <span className="font-bold text-red-600">
                      {selectedPromotion.discountValue}{selectedPromotion.discountType === 'percentage' ? '%' : ' ج'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">النوع:</span>
                    <span className="font-semibold text-gray-800">{getTypeLabel(selectedPromotion.type)}</span>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  التواريخ
                </h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">من:</span>
                    <span className="font-semibold text-gray-800">{selectedPromotion.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">إلى:</span>
                    <span className="font-semibold text-gray-800">{selectedPromotion.endDate}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">الإحصائيات</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المنتجات:</span>
                    <span className="font-semibold text-gray-800">{selectedPromotion.applicableProducts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الاستخدام:</span>
                    <span className="font-semibold text-gray-800">{selectedPromotion.usageCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">التوفير:</span>
                    <span className="font-bold text-red-600">{(selectedPromotion.totalSavings / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-200 space-y-2">
              <button className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold flex items-center justify-center gap-2">
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

export default PromotionsManager;
