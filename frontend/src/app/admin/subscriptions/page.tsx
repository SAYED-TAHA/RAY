'use client';

import React, { useEffect, useState } from 'react';
import { Crown, Search, Download, CheckCircle, XCircle, Clock, RefreshCw, Plus } from 'lucide-react';
import Link from 'next/link';
import { fetchAdminSubscriptions, type AdminSubscription } from '../../../services/adminSubscriptionsService';

export default function AdminSubscriptions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

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
      console.error('Failed to load subscriptions:', e);
      setError(e?.message || 'فشل تحميل الاشتراكات');
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter(s => s.status === 'active').length,
    expired: subscriptions.filter(s => s.status === 'expired').length,
    cancelled: subscriptions.filter(s => s.status === 'cancelled').length,
    pending: subscriptions.filter(s => s.status === 'pending').length
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'expired':
        return 'منتهي';
      case 'cancelled':
        return 'ملغي';
      case 'pending':
        return 'معلق';
      default:
        return status;
    }
  };

  const filteredSubscriptions = subscriptions.filter(subscription => {
    const user = subscription.user || '';
    const pkg = subscription.package || '';
    const id = subscription.id || '';
    const term = searchTerm.trim();
    const matchesSearch = !term || user.includes(term) || pkg.includes(term) || id.includes(term);
    const matchesStatus = selectedStatus === 'all' || subscription.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Crown className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الاشتراكات</h1>
                <p className="text-sm text-gray-600">إدارة اشتراكات المستخدمين</p>
              </div>
            </div>
            <button disabled className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-60">
              <Plus className="w-4 h-4" />
              اشتراك جديد
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 rounded-xl p-6 border border-red-200 text-red-700 text-center">
            {error}
            <button onClick={load} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              إعادة المحاولة
            </button>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center text-gray-600">
            جاري تحميل الاشتراكات...
          </div>
        ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الإجمالي</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Crown className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">نشط</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">منتهي</p>
                <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ملغي</p>
                <p className="text-2xl font-bold text-gray-600">{stats.cancelled}</p>
              </div>
              <Clock className="w-8 h-8 text-gray-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">معلق</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <RefreshCw className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="بحث في الاشتراكات..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            
            <div className="flex gap-3">
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="expired">منتهي</option>
                <option value="cancelled">ملغي</option>
                <option value="pending">معلق</option>
              </select>
              
              <button disabled className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg opacity-60 cursor-not-allowed">
                <Download className="w-4 h-4" />
                تصدير
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاشتراك</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المستخدم</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الباقة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المدة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تجديد تلقائي</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSubscriptions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center text-gray-600">
                      لا توجد اشتراكات
                    </td>
                  </tr>
                ) : filteredSubscriptions.map(subscription => (
                  <tr key={subscription.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{subscription.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{subscription.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{subscription.package}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(subscription.status)}`}>
                        {getStatusText(subscription.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div>{subscription.startDate || '—'}</div>
                      <div className="text-xs">إلى {subscription.endDate || '—'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {subscription.amount} {subscription.currency || 'EGP'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${subscription.autoRenew ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {subscription.autoRenew ? 'مفعل' : 'معطل'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      <div className="flex items-center gap-2">
                        <button disabled className="text-blue-600 opacity-60">
                          تعديل
                        </button>
                        <button disabled className="text-red-600 opacity-60">
                          إلغاء
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}
