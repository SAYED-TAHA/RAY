'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart3, LineChart, PieChart, TrendingUp, Calendar, Download,
  ArrowLeft, Loader, Filter
} from 'lucide-react';

interface AnalyticsData {
  dailyViews: { date: string; views: number }[];
  deviceBreakdown: { device: string; percentage: number; count: number }[];
  sourceBreakdown: { source: string; percentage: number; count: number }[];
  hourlyData: { hour: number; views: number; clicks: number }[];
  topPages: { page: string; views: number; clicks: number; ctr: number }[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7days');
  const [merchantId] = useState('default');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_URL}/api/storefront/${merchantId}/analytics?range=${dateRange}`
        );
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        }
      } catch (error) {
        console.error('خطأ في جلب التحليلات:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [merchantId, dateRange]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/storefront/dashboard"
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">التحليلات المتقدمة</h1>
                <p className="text-sm text-gray-600 mt-1">تحليل تفصيلي لأداء متجرك</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Download className="w-4 h-4" />
              تحميل التقرير
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Range Filter */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="7days">آخر 7 أيام</option>
              <option value="30days">آخر 30 يوم</option>
              <option value="90days">آخر 90 يوم</option>
              <option value="1year">آخر سنة</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">جاري تحميل التحليلات...</p>
            </div>
          </div>
        ) : analytics ? (
          <>
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Daily Views Chart */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <LineChart className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-gray-900">المشاهدات اليومية</h2>
                </div>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-600">رسم بياني للمشاهدات اليومية</p>
                </div>
              </div>

              {/* Hourly Data Chart */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg font-bold text-gray-900">البيانات بالساعة</h2>
                </div>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-600">رسم بياني للبيانات بالساعة</p>
                </div>
              </div>
            </div>

            {/* Breakdown Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Device Breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <PieChart className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-bold text-gray-900">توزيع الأجهزة</h2>
                </div>
                <div className="space-y-3">
                  {analytics.deviceBreakdown.map((device, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{device.device}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${device.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-sm font-bold text-gray-900">{device.percentage}%</p>
                        <p className="text-xs text-gray-600">{device.count}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Source Breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <h2 className="text-lg font-bold text-gray-900">مصادر الزيارات</h2>
                </div>
                <div className="space-y-3">
                  {analytics.sourceBreakdown.map((source, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{source.source}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-orange-600 h-2 rounded-full"
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-sm font-bold text-gray-900">{source.percentage}%</p>
                        <p className="text-xs text-gray-600">{source.count}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Pages */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">أكثر الصفحات زيارة</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">الصفحة</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">المشاهدات</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">النقرات</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">معدل النقر</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.topPages.map((page, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-3 px-4 text-sm text-gray-900">{page.page}</td>
                        <td className="text-right py-3 px-4 text-sm text-gray-900">{page.views.toLocaleString()}</td>
                        <td className="text-right py-3 px-4 text-sm text-gray-900">{page.clicks.toLocaleString()}</td>
                        <td className="text-right py-3 px-4 text-sm font-semibold text-blue-600">{page.ctr.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600">لم يتم تحميل البيانات</p>
          </div>
        )}
      </div>
    </div>
  );
}
