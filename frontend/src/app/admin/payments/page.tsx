'use client';

import React, { useEffect, useState } from 'react';
import { 
  CreditCard, DollarSign, TrendingUp, TrendingDown, Search, Filter,
  Download, Eye, CheckCircle, XCircle, AlertCircle, Calendar,
  Clock, User, Mail, Phone, Package, Truck, RefreshCw,
  ArrowUpRight, ArrowDownRight, BarChart3, PieChart, Wallet,
  Banknote, Receipt, Gift, Percent, ArrowUpDown
} from 'lucide-react';
import Link from 'next/link';
import { fetchOrders } from '../../../services/ordersService';

export default function AdminPayments() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingPayments: 0,
    completedPayments: 0,
    failedPayments: 0,
    refundRequests: 0,
    averageOrderValue: 0
  });
  const [payments, setPayments] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);

  const loadPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchOrders({ limit: 500 });
      const orders = data.orders;

      // Extract payment info from orders
      const paymentsList = orders.map((order: any) => ({
        id: `PAY${order.id?.slice(-3) || '000'}`,
        customer: order.customer?.name || order.userId || 'مستخدم',
        email: order.customer?.email || '',
        amount: order.pricing?.total || 0,
        method: order.payment?.method || 'cash_on_delivery',
        status: order.payment?.status === 'paid' ? 'completed' : (order.payment?.status === 'pending' ? 'pending' : 'failed'),
        date: order.createdAt ? new Date(order.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        orderId: order.id,
        fee: (order.pricing?.total || 0) * 0.03
      }));

      setPayments(paymentsList);

      const methodMeta: Record<string, { name: string; icon: any; color: string }> = {
        credit_card: { name: 'بطاقة ائتمان', icon: CreditCard, color: 'bg-blue-500' },
        paypal: { name: 'PayPal', icon: Wallet, color: 'bg-yellow-500' },
        cash_on_delivery: { name: 'الدفع عند الاستلام', icon: DollarSign, color: 'bg-green-500' },
        bank_transfer: { name: 'تحويل بنكي', icon: Banknote, color: 'bg-purple-500' }
      };

      const methodCounts = paymentsList.reduce((acc: Record<string, number>, p: any) => {
        const key = p.method || 'cash_on_delivery';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      const totalCount = paymentsList.length || 1;
      const methodsList = Object.keys(methodCounts).map((key) => {
        const meta = methodMeta[key] || { name: key, icon: Wallet, color: 'bg-gray-500' };
        const count = methodCounts[key] || 0;
        return {
          name: meta.name,
          count,
          percentage: Math.round((count / totalCount) * 100),
          icon: meta.icon,
          color: meta.color
        };
      });

      setPaymentMethods(methodsList);

      // Calculate stats from real data
      const totalRev = paymentsList.reduce((sum: number, p: any) => sum + (p.status === 'completed' ? p.amount : 0), 0);
      const pendingPay = paymentsList.reduce((sum: number, p: any) => sum + (p.status === 'pending' ? p.amount : 0), 0);
      const completedPay = paymentsList.reduce((sum: number, p: any) => sum + (p.status === 'completed' ? p.amount : 0), 0);
      const failedPay = paymentsList.reduce((sum: number, p: any) => sum + (p.status === 'failed' ? p.amount : 0), 0);
      const avgOrder = paymentsList.length > 0 ? Math.round(totalRev / paymentsList.length) : 0;

      setStats({
        totalRevenue: totalRev,
        pendingPayments: pendingPay,
        completedPayments: completedPay,
        failedPayments: failedPay,
        refundRequests: 0,
        averageOrderValue: avgOrder
      });
    } catch (e: any) {
      console.error('Failed to load payments:', e);
      setError(e?.message || 'فشل تحميل المدفوعات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'pending':
        return 'معلق';
      case 'failed':
        return 'فشل';
      case 'refunded':
        return 'مسترد';
      default:
        return status;
    }
  };

  const getMethodText = (method: string) => {
    switch (method) {
      case 'credit_card':
        return 'بطاقة ائتمان';
      case 'paypal':
        return 'PayPal';
      case 'cash_on_delivery':
        return 'الدفع عند الاستلام';
      case 'bank_transfer':
        return 'تحويل بنكي';
      default:
        return method;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-2xl font-bold text-gray-900">المدفوعات</h1>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center text-gray-600">
            جاري تحميل المدفوعات...
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
              <h1 className="text-2xl font-bold text-gray-900">المدفوعات</h1>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 rounded-xl p-6 border border-red-200 text-red-700 text-center">
            {error}
            <button onClick={loadPayments} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customer.includes(searchTerm) || payment.email.includes(searchTerm) || payment.id.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <CreditCard className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">المدفوعات</h1>
                <p className="text-sm text-gray-600">إدارة المعاملات المالية</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button disabled className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-60 cursor-not-allowed">
                <Download className="w-4 h-4" />
                تصدير تقرير
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">N/A</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()} ج</h3>
            <p className="text-sm text-gray-600">إجمالي الإيرادات</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-sm text-yellow-600 font-medium">معلقة</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.pendingPayments.toLocaleString()} ج</h3>
            <p className="text-sm text-gray-600">مدفوعات معلقة</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-blue-600 font-medium">مكتملة</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.completedPayments.toLocaleString()} ج</h3>
            <p className="text-sm text-gray-600">مدفوعات مكتملة</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm text-red-600 font-medium">فشلت</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.failedPayments.toLocaleString()} ج</h3>
            <p className="text-sm text-gray-600">مدفوعات فشلت</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6">طرق الدفع</h3>
              <div className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${method.color} rounded-lg flex items-center justify-center`}>
                        <method.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{method.name}</h4>
                        <p className="text-sm text-gray-600">{method.count} عملية</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{method.percentage}%</div>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${method.color} h-2 rounded-full`}
                          style={{ width: `${method.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">ملخص سريع</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">متوسط قيمة الطلب</span>
                  <span className="font-medium">{stats.averageOrderValue} ج</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">طلبات استرداد</span>
                  <span className="font-medium">{stats.refundRequests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">معدل التحويل</span>
                  <span className="font-medium">N/A</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="بحث عن مدفوعات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع الحالات</option>
                <option value="completed">مكتمل</option>
                <option value="pending">معلق</option>
                <option value="failed">فشل</option>
                <option value="refunded">مسترد</option>
              </select>
              
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="today">اليوم</option>
                <option value="week">هذا الأسبوع</option>
                <option value="month">هذا الشهر</option>
                <option value="year">هذا العام</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم العملية</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العميل</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">طريقة الدفع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.id}</div>
                      <div className="text-xs text-gray-500">{payment.orderId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.customer}</div>
                      <div className="text-xs text-gray-500">{payment.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.amount} ج</div>
                      <div className="text-xs text-gray-500">رسوم: {payment.fee} ج</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getMethodText(payment.method)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(payment.status)}`}>
                        {getStatusText(payment.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      <div className="flex items-center gap-2">
                        <button disabled className="text-blue-600 opacity-60 cursor-not-allowed">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button disabled className="text-gray-600 opacity-60 cursor-not-allowed">
                          <Receipt className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
