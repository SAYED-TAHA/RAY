'use client';

import React, { useState } from 'react';
import { 
  CreditCard, DollarSign, TrendingUp, TrendingDown, Search, Filter,
  Download, Eye, CheckCircle, XCircle, AlertCircle, Calendar,
  Clock, User, Mail, Phone, Package, Truck, RefreshCw,
  ArrowUpRight, ArrowDownRight, BarChart3, PieChart, Wallet,
  Banknote, Receipt, Gift, Percent, ArrowUpDown
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPayments() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const stats = {
    totalRevenue: 2456789,
    pendingPayments: 45678,
    completedPayments: 2345678,
    failedPayments: 12345,
    refundRequests: 234,
    averageOrderValue: 456
  };

  const payments = [
    {
      id: 'PAY001',
      customer: 'أحمد محمد',
      email: 'ahmed@email.com',
      amount: 1250,
      method: 'credit_card',
      status: 'completed',
      date: '2025-12-05',
      orderId: 'ORD001',
      fee: 37.5
    },
    {
      id: 'PAY002',
      customer: 'سارة أحمد',
      email: 'sara@email.com',
      amount: 890,
      method: 'paypal',
      status: 'pending',
      date: '2025-12-05',
      orderId: 'ORD002',
      fee: 26.7
    },
    {
      id: 'PAY003',
      customer: 'محمد علي',
      email: 'mohammed@email.com',
      amount: 2100,
      method: 'cash_on_delivery',
      status: 'completed',
      date: '2025-12-04',
      orderId: 'ORD003',
      fee: 0
    },
    {
      id: 'PAY004',
      customer: 'فاطمة حسن',
      email: 'fatima@email.com',
      amount: 450,
      method: 'bank_transfer',
      status: 'failed',
      date: '2025-12-04',
      orderId: 'ORD004',
      fee: 13.5
    }
  ];

  const paymentMethods = [
    { name: 'بطاقة ائتمان', count: 1234, percentage: 45, icon: CreditCard, color: 'bg-blue-500' },
    { name: 'PayPal', count: 890, percentage: 32, icon: Wallet, color: 'bg-yellow-500' },
    { name: 'الدفع عند الاستلام', count: 456, percentage: 17, icon: DollarSign, color: 'bg-green-500' },
    { name: 'تحويل بنكي', count: 189, percentage: 6, icon: Banknote, color: 'bg-purple-500' }
  ];

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
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
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
              <span className="text-sm text-green-600 font-medium">+12.5%</span>
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
                  <span className="font-medium">68.5%</span>
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
                {payments.map((payment) => (
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
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
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
