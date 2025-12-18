'use client';

import React, { useEffect, useState } from 'react';
import { Receipt, Plus, Download, Eye, Trash2, Search } from 'lucide-react';
import Link from 'next/link';
import { fetchOrders } from '../../../services/ordersService';

export default function AdminInvoices() {
  const [searchTerm, setSearchTerm] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<any[]>([]);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchOrders({ limit: 500 });
      const orders = data.orders;

      const mapped = orders.map((order: any) => {
        const createdAt = order.createdAt ? new Date(order.createdAt) : new Date();
        const date = createdAt.toISOString().split('T')[0];
        const paymentStatus = order.payment?.status;
        const status = paymentStatus === 'paid' ? 'paid' : paymentStatus === 'pending' ? 'pending' : 'overdue';

        return {
          id: `INV${String(order.id || order._id || '').slice(-3) || '000'}`,
          customer: order.customer?.name || order.customerId || order.userId || 'مستخدم',
          amount: order.pricing?.total || 0,
          status,
          date
        };
      });

      setInvoices(mapped);
    } catch (e: any) {
      console.error('Failed to load invoices:', e);
      setError(e?.message || 'فشل تحميل الفواتير');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const filteredInvoices = invoices.filter((invoice) => {
    const q = searchTerm.trim();
    if (!q) return true;
    return String(invoice.id).includes(q) || String(invoice.customer).includes(q);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Receipt className="w-6 h-6 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">الفواتير</h1>
                  <p className="text-sm text-gray-600">إدارة الفواتير والمستندات</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center text-gray-600">
            جاري تحميل الفواتير...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Receipt className="w-6 h-6 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">الفواتير</h1>
                  <p className="text-sm text-gray-600">إدارة الفواتير والمستندات</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 rounded-xl p-6 border border-red-200 text-red-700 text-center">
            {error}
            <button onClick={loadInvoices} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Receipt className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الفواتير</h1>
                <p className="text-sm text-gray-600">إدارة الفواتير والمستندات</p>
              </div>
            </div>
            <button disabled className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-60 cursor-not-allowed">
              <Plus className="w-4 h-4" />
              فاتورة جديدة
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="بحث في الفواتير..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">رقم الفاتورة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العميل</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-600">
                      لا توجد فواتير
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{invoice.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{invoice.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{invoice.amount} ج.م</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {invoice.status === 'paid' ? 'مدفوعة' : invoice.status === 'pending' ? 'معلقة' : 'متأخرة'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{invoice.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button disabled className="text-blue-600 opacity-60 cursor-not-allowed"><Eye className="w-4 h-4" /></button>
                        <button disabled className="text-green-600 opacity-60 cursor-not-allowed"><Download className="w-4 h-4" /></button>
                        <button disabled className="text-red-600 opacity-60 cursor-not-allowed"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
