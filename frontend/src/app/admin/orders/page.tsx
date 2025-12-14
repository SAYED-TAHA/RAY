'use client';

import React, { useState } from 'react';
import { 
  ShoppingCart, Search, Filter, Download, Eye, Edit, Trash2,
  Package, DollarSign, Calendar, Clock, MapPin, Phone,
  Mail, User, CheckCircle, XCircle, AlertCircle,
  Truck, PackageCheck, CreditCard, TrendingUp
} from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed';
  paymentMethod: 'card' | 'cash' | 'wallet';
  date: string;
  deliveryAddress: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export default function AdminOrders() {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-2024-001',
      customerName: 'أحمد محمد',
      customerEmail: 'ahmed@example.com',
      customerPhone: '01234567890',
      items: 3,
      total: 1250,
      status: 'processing',
      paymentStatus: 'paid',
      paymentMethod: 'card',
      date: '2024-12-05 10:30',
      deliveryAddress: 'القاهرة، المعادي، شارع التحرير 15',
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-12-07'
    },
    {
      id: 'ORD-2024-002',
      customerName: 'سارة أحمد',
      customerEmail: 'sara@example.com',
      customerPhone: '01123456789',
      items: 1,
      total: 890,
      status: 'shipped',
      paymentStatus: 'paid',
      paymentMethod: 'wallet',
      date: '2024-12-05 09:15',
      deliveryAddress: 'الإسكندرية، سان ستيفانو',
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-12-06'
    },
    {
      id: 'ORD-2024-003',
      customerName: 'محمد علي',
      customerEmail: 'mohammed@example.com',
      customerPhone: '01098765432',
      items: 5,
      total: 2340,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'cash',
      date: '2024-12-05 08:45',
      deliveryAddress: 'الجيزة، المهندسين'
    },
    {
      id: 'ORD-2024-004',
      customerName: 'مريم خالد',
      customerEmail: 'mariam@example.com',
      customerPhone: '01234567891',
      items: 2,
      total: 1560,
      status: 'delivered',
      paymentStatus: 'paid',
      paymentMethod: 'card',
      date: '2024-12-04 15:20',
      deliveryAddress: 'القاهرة، مصر الجديدة'
    },
    {
      id: 'ORD-2024-005',
      customerName: 'ياسر محمود',
      customerEmail: 'yasser@example.com',
      customerPhone: '01012345678',
      items: 4,
      total: 1890,
      status: 'cancelled',
      paymentStatus: 'failed',
      paymentMethod: 'card',
      date: '2024-12-04 12:10',
      deliveryAddress: 'القاهرة، حلمية الزيتون'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesPayment = selectedPayment === 'all' || order.paymentStatus === selectedPayment;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'processing':
        return 'bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'shipped':
        return 'bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'delivered':
        return 'bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'cancelled':
        return 'bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold';
      default:
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'failed':
        return 'bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold';
      default:
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'processing': return 'قيد المعالجة';
      case 'shipped': return 'تم الشحن';
      case 'delivered': return 'تم التسليم';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const getPaymentLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'مدفوع';
      case 'pending': return 'في الانتظار';
      case 'failed': return 'فشل';
      default: return status;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'card': return 'بطاقة';
      case 'cash': return 'نقدي';
      case 'wallet': return 'محفظة';
      default: return method;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'processing': return <Package className="w-4 h-4 text-blue-500" />;
      case 'shipped': return <Truck className="w-4 h-4 text-purple-500" />;
      case 'delivered': return <PackageCheck className="w-4 h-4 text-green-500" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition">
                ← لوحة التحكم
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">الطلبات</h1>
              <span className="bg-ray-blue text-white px-3 py-1 rounded-full text-sm font-bold">
                {filteredOrders.length}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="bg-ray-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                طلب جديد
              </button>
              <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                تصدير
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {orders.filter(o => o.status === 'pending').length}
            </span>
          </div>
          <h3 className="text-sm text-gray-600">في الانتظار</h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {orders.filter(o => o.status === 'processing').length}
            </span>
          </div>
          <h3 className="text-sm text-gray-600">قيد المعالجة</h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Truck className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {orders.filter(o => o.status === 'shipped').length}
            </span>
          </div>
          <h3 className="text-sm text-gray-600">تم الشحن</h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <PackageCheck className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {orders.filter(o => o.status === 'delivered').length}
            </span>
          </div>
          <h3 className="text-sm text-gray-600">تم التسليم</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="بحث بالرقم، اسم العميل، أو البريد الإلكتروني..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
              />
            </div>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
            >
              <option value="all">كل الحالات</option>
              <option value="pending">في الانتظار</option>
              <option value="processing">قيد المعالجة</option>
              <option value="shipped">تم الشحن</option>
              <option value="delivered">تم التسليم</option>
              <option value="cancelled">ملغي</option>
            </select>
            
            <select
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
            >
              <option value="all">كل حالات الدفع</option>
              <option value="paid">مدفوع</option>
              <option value="pending">في الانتظار</option>
              <option value="failed">فشل</option>
            </select>
            
            <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
              <Filter className="w-4 h-4" />
              فلاتر متقدمة
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الطلب
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    العميل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المنتجات
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المبلغ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الدفع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التاريخ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(order.status)}
                        <div className="mr-3">
                          <div className="text-sm font-medium text-gray-900">{order.id}</div>
                          {order.trackingNumber && (
                            <div className="text-xs text-gray-500">{order.trackingNumber}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-500">{order.customerEmail}</div>
                        <div className="text-xs text-gray-400">{order.customerPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.items} منتجات
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.total.toLocaleString()} ج.م
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(order.status)}>
                        {getStatusLabel(order.status)}
                      </span>
                      {order.estimatedDelivery && (
                        <div className="text-xs text-gray-500 mt-1">
                          {order.estimatedDelivery}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getPaymentBadge(order.paymentStatus)}>
                        {getPaymentLabel(order.paymentStatus)}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {getPaymentMethodLabel(order.paymentMethod)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-ray-blue hover:text-blue-600 transition">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 transition">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700 transition">
                          <Trash2 className="w-4 h-4" />
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
