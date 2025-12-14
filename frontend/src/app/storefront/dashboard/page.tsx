'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart3, Eye, Settings, Image, Palette, Save, RotateCcw,
  TrendingUp, Users, ShoppingCart, Star, ArrowRight, Loader
} from 'lucide-react';

interface StorefrontStats {
  views: number;
  clicks: number;
  conversions: number;
  rating: number;
  reviews: number;
}

interface RecentActivity {
  id: string;
  type: 'view' | 'click' | 'config_change';
  description: string;
  timestamp: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function StorefrontDashboard() {
  const [stats, setStats] = useState<StorefrontStats>({
    views: 0,
    clicks: 0,
    conversions: 0,
    rating: 0,
    reviews: 0
  });
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [merchantId] = useState('default');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/storefront/${merchantId}/stats`);
        if (response.ok) {
          const data = await response.json();
          setStats(data.stats || {});
          setActivities(data.activities || []);
        }
      } catch (error) {
        console.error('خطأ في جلب الإحصائيات:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // تحديث كل 30 ثانية
    return () => clearInterval(interval);
  }, [merchantId]);

  const conversionRate = stats.clicks > 0 ? ((stats.conversions / stats.clicks) * 100).toFixed(2) : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم المتجر</h1>
              <p className="text-sm text-gray-600 mt-1">إدارة وتحليل أداء متجرك الإلكتروني</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/storefront/default`}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
              >
                <Eye className="w-4 h-4" />
                معاينة المتجر
              </Link>
              <Link
                href="/storefront"
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
              >
                <Settings className="w-4 h-4" />
                تخصيص المتجر
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">جاري تحميل البيانات...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              {/* Views */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-600">المشاهدات</h3>
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.views.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-2">↑ 12% من الأسبوع الماضي</p>
              </div>

              {/* Clicks */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-600">النقرات</h3>
                  <ShoppingCart className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.clicks.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-2">↑ 8% من الأسبوع الماضي</p>
              </div>

              {/* Conversions */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-600">التحويلات</h3>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.conversions.toLocaleString()}</p>
                <p className="text-xs text-blue-600 mt-2">معدل التحويل: {conversionRate}%</p>
              </div>

              {/* Rating */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-600">التقييم</h3>
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.rating.toFixed(1)}</p>
                <p className="text-xs text-gray-600 mt-2">من {stats.reviews} تقييم</p>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-600">التقييمات</h3>
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.reviews}</p>
                <p className="text-xs text-green-600 mt-2">↑ 5 تقييمات جديدة</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Customization */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Palette className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">تخصيص الألوان</h3>
                    <p className="text-sm text-gray-600">غيّر مظهر متجرك</p>
                  </div>
                </div>
                <Link
                  href="/storefront?tab=colors"
                  className="flex items-center justify-between w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-semibold"
                >
                  انتقل الآن
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Media Management */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Image className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">إدارة الصور</h3>
                    <p className="text-sm text-gray-600">رفع وتنظيم الصور</p>
                  </div>
                </div>
                <Link
                  href="/storefront?tab=media"
                  className="flex items-center justify-between w-full px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition text-sm font-semibold"
                >
                  انتقل الآن
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Settings */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">الإعدادات</h3>
                    <p className="text-sm text-gray-600">إدارة الإعدادات العامة</p>
                  </div>
                </div>
                <Link
                  href="/storefront?tab=elements"
                  className="flex items-center justify-between w-full px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition text-sm font-semibold"
                >
                  انتقل الآن
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">النشاط الأخير</h2>
              {activities.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">لا يوجد نشاط حالياً</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activities.map(activity => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-600 mt-1">{activity.timestamp}</p>
                      </div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
