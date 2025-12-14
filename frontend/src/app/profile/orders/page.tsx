'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, Search, Filter, Calendar, MapPin, CreditCard, Star, ChevronLeft, DollarSign, Loader } from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: string;
  items: number;
  merchant: string;
  merchantId: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'bg-green-100 text-green-700';
    case 'processing': return 'bg-blue-100 text-blue-700';
    case 'shipped': return 'bg-yellow-100 text-yellow-700';
    case 'pending': return 'bg-gray-100 text-gray-700';
    case 'cancelled': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'delivered': return 'تم التسليم';
    case 'processing': return 'قيد المعالجة';
    case 'shipped': return 'تم الشحن';
    case 'pending': return 'في الانتظار';
    case 'cancelled': return 'ملغي';
    default: return status;
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/profile/orders`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('خطأ في جلب الطلبات:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.merchant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/profile" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
              <ArrowLeft className="w-5 h-5" />
              العودة للملف الشخصي
            </Link>
            
            <h1 className="text-xl font-bold text-gray-900">طلباتي</h1>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="البحث برقم الطلب أو اسم المتجر..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
            >
              <option value="all">جميع الحالات</option>
              <option value="pending">في الانتظار</option>
              <option value="processing">قيد المعالجة</option>
              <option value="shipped">تم الشحن</option>
              <option value="delivered">تم التسليم</option>
              <option value="cancelled">ملغي</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد طلبات</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'جرب تغيير الفلاتر أو البحث' 
                : 'ابدأ بالتسوق من متاجرنا'}
            </p>
            <Link
              href="/"
              className="bg-ray-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              استكشف المتاجر
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{order.orderNumber}</h3>
                        <p className="text-sm text-gray-600">{order.merchant}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {order.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        {order.items} منتجات
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-medium text-gray-900">{order.total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/merchant/${order.merchantId}`}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      عرض المتجر
                    </Link>
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="px-4 py-2 bg-ray-blue text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      تفاصيل الطلب
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">تفاصيل الطلب</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Order Info */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{selectedOrder.orderNumber}</h3>
                    <p className="text-gray-600">{selectedOrder.merchant}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusLabel(selectedOrder.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">تاريخ الطلب:</span>
                    <p className="font-medium">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">عدد المنتجات:</span>
                    <p className="font-medium">{selectedOrder.items}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">الإجمالي:</span>
                    <p className="font-medium text-lg">{selectedOrder.total}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">طريقة الدفع:</span>
                    <p className="font-medium">بطاقة ائتمان</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-4">المنتجات</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                      <div>
                        <h5 className="font-medium">منتج 1</h5>
                        <p className="text-sm text-gray-600">الكمية: 2</p>
                      </div>
                    </div>
                    <p className="font-medium">150 ج.م</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                      <div>
                        <h5 className="font-medium">منتج 2</h5>
                        <p className="text-sm text-gray-600">الكمية: 1</p>
                      </div>
                    </div>
                    <p className="font-medium">100 ج.م</p>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-4">معلومات الشحن</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium mb-2">أحمد محمد</p>
                  <p className="text-sm text-gray-600">القاهرة، المعادي</p>
                  <p className="text-sm text-gray-600">شارع التحرير 15، الدور 5، شقة 12</p>
                  <p className="text-sm text-gray-600">+20 1234567890</p>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">تتبع الطلب</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">تم استلام الطلب</p>
                      <p className="text-sm text-gray-600">1 ديسمبر 2024، 10:00 ص</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">قيد المعالجة</p>
                      <p className="text-sm text-gray-600">1 ديسمبر 2024، 2:00 م</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-500">تم التسليم (متوقع)</p>
                      <p className="text-sm text-gray-400">3 ديسمبر 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  إغلاق
                </button>
                <button className="flex-1 px-4 py-2 bg-ray-blue text-white rounded-lg hover:bg-blue-600 transition">
                  تتبع الطلب
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
