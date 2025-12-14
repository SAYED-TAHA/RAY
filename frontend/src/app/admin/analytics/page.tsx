'use client';

import React, { useState } from 'react';
import { 
  BarChart3, PieChart, TrendingUp, TrendingDown, Users,
  ShoppingCart, DollarSign, Package, Eye, Download,
  Calendar, Filter, Search, ArrowUp, ArrowDown,
  Activity, Target, Zap, Award
} from 'lucide-react';
import Link from 'next/link';

export default function AdminAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const stats = {
    revenue: { current: 2456789, previous: 1987654, change: 23.7 },
    users: { current: 15234, previous: 13456, change: 13.2 },
    orders: { current: 45678, previous: 39876, change: 14.6 },
    products: { current: 8923, previous: 8234, change: 8.4 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition">
                ← لوحة التحكم
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">التحليلات</h1>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
              >
                <option value="today">اليوم</option>
                <option value="week">هذا الأسبوع</option>
                <option value="month">هذا الشهر</option>
                <option value="year">هذه السنة</option>
              </select>
              <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                تصدير التقرير
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {Object.entries(stats).map(([key, stat]) => (
            <div key={key} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {key === 'revenue' && <DollarSign className="w-6 h-6 text-blue-600" />}
                  {key === 'users' && <Users className="w-6 h-6 text-blue-600" />}
                  {key === 'orders' && <ShoppingCart className="w-6 h-6 text-blue-600" />}
                  {key === 'products' && <Package className="w-6 h-6 text-blue-600" />}
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {Math.abs(stat.change)}%
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.current.toLocaleString()}</h3>
              <p className="text-sm text-gray-600">
                {key === 'revenue' && 'إجمالي الإيرادات'}
                {key === 'users' && 'إجمالي المستخدمين'}
                {key === 'orders' && 'إجمالي الطلبات'}
                {key === 'products' && 'إجمالي المنتجات'}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">نمو الإيرادات</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <BarChart3 className="w-12 h-12 text-gray-400" />
              <span className="ml-2 text-gray-500">مخطط الإيرادات</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">توزيع الفئات</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <PieChart className="w-12 h-12 text-gray-400" />
              <span className="ml-2 text-gray-500">مخطط الفئات</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
