'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Star, TrendingUp, Users, Award } from 'lucide-react';
import Link from 'next/link';
import { fetchAdminSubscriptions, type AdminSubscription } from '../../../services/adminSubscriptionsService';

export default function AdminPopularPackages() {
  const [subscriptions, setSubscriptions] = useState<AdminSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAdminSubscriptions(500);
      setSubscriptions(Array.isArray(data) ? data : []);
    } catch (e: any) {
      console.error('Failed to load popular packages:', e);
      setError(e?.message || 'فشل تحميل البيانات');
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const packages = useMemo(() => {
    const planMeta: Record<string, { id: string; name: string }> = {
      free: { id: 'free', name: 'الباقة المجانية' },
      basic: { id: 'basic', name: 'الباقة الأساسية' },
      premium: { id: 'premium', name: 'الباقة المميزة' },
      enterprise: { id: 'enterprise', name: 'الباقة المؤسسية' }
    };

    const buckets: Record<string, { plan: string; users: Set<string>; subs: number; revenue: number }> = {};
    subscriptions.forEach((s) => {
      const plan = (s.plan || '').toString().trim() || 'basic';
      if (!buckets[plan]) buckets[plan] = { plan, users: new Set<string>(), subs: 0, revenue: 0 };
      buckets[plan].subs += 1;
      if (s.userId) buckets[plan].users.add(String(s.userId));
      if (s.status === 'active') buckets[plan].revenue += Number(s.amount || 0);
    });

    const rows = Object.keys(planMeta).map((plan) => {
      const b = buckets[plan] || { plan, users: new Set<string>(), subs: 0, revenue: 0 };
      return {
        id: planMeta[plan].id,
        name: planMeta[plan].name,
        rating: null as number | null,
        reviews: null as number | null,
        subscribers: b.users.size,
        growth: null as number | null,
        revenue: b.revenue
      };
    });

    return rows.sort((a, b) => (b.subscribers || 0) - (a.subscribers || 0));
  }, [subscriptions]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Award className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الباقات الأكثر شهرة</h1>
                <p className="text-sm text-gray-600">الباقات المفضلة والأعلى تقييماً</p>
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
            جاري تحميل البيانات...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((pkg: any, index: number) => (
              <div key={pkg.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-gray-900">#{index + 1}</span>
                      <h3 className="text-lg font-bold text-gray-900">{pkg.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gray-300" />
                      ))}
                      <span className="text-sm text-gray-600">(N/A)</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                    ⭐ N/A
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-blue-600" />
                      <p className="text-xs text-gray-600">المشتركون</p>
                    </div>
                    <p className="text-lg font-bold text-blue-600">{Number(pkg.subscribers || 0).toLocaleString()}</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <p className="text-xs text-gray-600">النمو</p>
                    </div>
                    <p className="text-lg font-bold text-green-600">N/A</p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">الإيرادات</p>
                    <p className="text-lg font-bold text-purple-600">{(Number(pkg.revenue || 0) / 1000).toFixed(0)}K</p>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">متوسط الإيراد</p>
                    <p className="text-lg font-bold text-orange-600">
                      {Number(pkg.subscribers || 0) > 0 ? `${Math.round(Number(pkg.revenue || 0) / Number(pkg.subscribers || 1))} ج.م` : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
