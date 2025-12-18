'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Zap, Activity } from 'lucide-react';
import Link from 'next/link';
import { fetchSystemHealth, fetchSystemStats, type SystemHealth, type SystemStats } from '../../../services/systemService';

export default function AdminPerformance() {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const [healthRes, statsRes] = await Promise.all([
        fetchSystemHealth(),
        fetchSystemStats()
      ]);
      setHealth(healthRes as any);
      setStats(statsRes as any);
    } catch (e: any) {
      console.error('Failed to load performance data:', e);
      setError(e?.message || 'فشل تحميل بيانات الأداء');
      setHealth(null);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const metrics = useMemo(() => {
    const cpu = health?.server?.cpu;
    const mem = health?.server?.memory;
    const errorRate = stats?.errorRate;
    const responseTime = stats?.responseTime;

    return [
      { name: 'استخدام CPU', value: cpu !== undefined ? `${cpu}%` : '—', target: '80%', status: cpu !== undefined && cpu <= 80 ? 'excellent' : 'good', trend: 0 },
      { name: 'استخدام الذاكرة', value: mem !== undefined ? `${mem}%` : '—', target: '70%', status: mem !== undefined && mem <= 70 ? 'excellent' : 'good', trend: 0 },
      { name: 'معدل الخطأ', value: errorRate || '—', target: '1%', status: 'good', trend: 0 },
      { name: 'زمن الاستجابة', value: responseTime && responseTime !== 'N/A' ? responseTime : '—', target: '500ms', status: 'good', trend: 0 },
      { name: 'طلبات API (30 يوم)', value: stats?.apiRequests !== undefined ? stats.apiRequests.toLocaleString() : '—', target: '—', status: 'good', trend: 0 },
      { name: 'حمل الخادم', value: health?.server?.status || '—', target: 'online', status: health?.server?.status === 'online' ? 'excellent' : 'good', trend: 0 }
    ];
  }, [health, stats]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Zap className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">مراقبة الأداء</h1>
                <p className="text-sm text-gray-600">تتبع أداء النظام والتطبيق</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 rounded-xl p-6 border border-red-200 text-red-700 text-center">
            {error}
            <div className="mt-4">
              <button onClick={load} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">إعادة المحاولة</button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center text-gray-600">
            جاري تحميل بيانات الأداء...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">{metric.name}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      metric.status === 'excellent' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {metric.status === 'excellent' ? 'ممتاز' : 'جيد'}
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                      <p className="text-xs text-gray-600 mt-1">الهدف: {metric.target}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      —
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">التنبيهات</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Activity className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">يتم عرض التنبيهات من سجل النظام عند تفعيلها</p>
                    <p className="text-xs text-gray-600">آخر تحديث: —</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
