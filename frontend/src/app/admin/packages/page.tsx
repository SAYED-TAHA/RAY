'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Package, Star, Edit, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { fetchAdminSubscriptions, type AdminSubscription } from '../../../services/adminSubscriptionsService';

export default function AdminPackages() {
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
      console.error('Failed to load packages:', e);
      setError(e?.message || 'فشل تحميل الباقات');
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const packages = useMemo(() => {
    const buckets: Record<string, { plan: string; users: Set<string>; subscriptions: number; revenue: number }> = {};

    subscriptions.forEach((s) => {
      const plan = (s.plan || '').toString().trim() || 'unknown';
      if (!buckets[plan]) {
        buckets[plan] = { plan, users: new Set<string>(), subscriptions: 0, revenue: 0 };
      }
      buckets[plan].subscriptions += 1;
      if (s.userId) buckets[plan].users.add(String(s.userId));
      if (s.status === 'active') buckets[plan].revenue += Number(s.amount || 0);
    });

    const plans = Object.keys(buckets).sort((a, b) => a.localeCompare(b));
    const rows = plans.map((plan) => {
      const b = buckets[plan];
      return {
        id: plan,
        name: plan,
        price: null as number | null,
        users: b.users.size,
        subscriptions: b.subscriptions,
        revenue: b.revenue,
        popular: false
      };
    });

    const maxSubs = rows.reduce((m, r) => Math.max(m, r.subscriptions || 0), 0);
    return rows.map((r) => ({ ...r, popular: maxSubs > 0 && r.subscriptions === maxSubs }));
  }, [subscriptions]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Package className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الباقات</h1>
                <p className="text-sm text-gray-600">إدارة باقات الاشتراك</p>
              </div>
            </div>
            <button disabled className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-60">
              <Plus className="w-4 h-4" />
              باقة جديدة
            </button>
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
            جاري تحميل الباقات...
          </div>
        ) : packages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 border border-gray-200 text-center">
            <p className="text-gray-900 font-medium mb-2">لا توجد باقات</p>
            <p className="text-sm text-gray-600">سيتم عرض الباقات هنا عند توفر بيانات خطط الاشتراك في قاعدة البيانات.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg: any) => (
              <div key={pkg.id} className={`rounded-xl shadow-sm border p-6 ${pkg.popular ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">{pkg.name}</h3>
                  {pkg.popular && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
                </div>

                <p className="text-3xl font-bold text-gray-900 mb-4">{typeof pkg.price === 'number' ? `${pkg.price} ج.م` : 'N/A'}</p>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المستخدمون</span>
                    <span className="font-medium">{Number(pkg.users || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الاشتراكات</span>
                    <span className="font-medium">{Number(pkg.subscriptions || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الإيرادات</span>
                    <span className="font-medium text-green-600">{Number(pkg.revenue || 0).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button disabled className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg opacity-60">
                    <Edit className="w-4 h-4" />
                    تعديل
                  </button>
                  <button disabled className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg opacity-60">
                    <Trash2 className="w-4 h-4" />
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
