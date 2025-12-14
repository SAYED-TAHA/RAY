'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, PieChart, TrendingUp, TrendingDown, Users,
  ShoppingCart, DollarSign, Package, Eye, Download,
  Calendar, Filter, Search, ArrowUp, ArrowDown,
  Activity, Target, Zap, Award
} from 'lucide-react';
import Link from 'next/link';
import { fetchAnalytics, fetchDashboardOverview, AnalyticsData, DashboardOverview } from '../../../services/analyticsService';

export default function AdminAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);

  // Load analytics data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [analytics, dashboard] = await Promise.all([
          fetchAnalytics(selectedPeriod),
          fetchDashboardOverview()
        ]);
        setAnalyticsData(analytics);
        setDashboardData(dashboard);
      } catch (error) {
        console.error('Failed to load analytics:', error);
        alert('فشل تحميل بيانات التحليلات. يرجى المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedPeriod]);

  // Refresh data
  const refreshData = async () => {
    setLoading(true);
    try {
      const [analytics, dashboard] = await Promise.all([
        fetchAnalytics(selectedPeriod),
        fetchDashboardOverview()
      ]);
      setAnalyticsData(analytics);
      setDashboardData(dashboard);
    } catch (error) {
      console.error('Failed to refresh analytics:', error);
      alert('فشل تحديث بيانات التحليلات. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ray-blue"></div>
        <span className="mr-3 text-gray-600">جاري تحميل بيانات التحليلات...</span>
      </div>
    );
  }

  // Use dashboard data for stats
  const stats = dashboardData ? {
    revenue: dashboardData.overview.revenue,
    orders: dashboardData.overview.orders,
    products: {
      current: dashboardData.overview.products.total,
      previous: Math.round(dashboardData.overview.products.total * 0.9),
      change: 10.0
    }
  } : {
    revenue: { current: 0, previous: 0, change: 0 },
    orders: { current: 0, previous: 0, change: 0 },
    products: { current: 0, previous: 0, change: 0 }
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
