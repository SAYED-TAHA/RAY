'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Search, Filter, MapPin, Clock, Star, ChevronLeft, Loader } from 'lucide-react';
import Link from 'next/link';

interface Booking {
  id: string;
  bookingNumber: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  service: string;
  merchant: string;
  merchantId: string;
  location: string;
  price: string;
  duration: string;
  paid: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed': return 'bg-green-100 text-green-700';
    case 'pending': return 'bg-yellow-100 text-yellow-700';
    case 'completed': return 'bg-blue-100 text-blue-700';
    case 'cancelled': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'confirmed': return 'مؤكد';
    case 'pending': return 'في الانتظار';
    case 'completed': return 'مكتمل';
    case 'cancelled': return 'ملغي';
    default: return status;
  }
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/profile/bookings`);
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      } catch (error) {
        console.error('خطأ في جلب الحجوزات:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleEditBooking = () => {
    setIsEditing(true);
    setEditedBooking(selectedBooking);
  };

  const handleSaveEdit = () => {
    // Here you would normally save to backend
    console.log('Saving booking:', editedBooking);
    setIsEditing(false);
    setSelectedBooking(editedBooking);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedBooking(null);
  };

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
            
            <h1 className="text-xl font-bold text-gray-900">حجوزاتي</h1>
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
                placeholder="البحث برقم الحجز أو اسم المتجر..."
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
              <option value="confirmed">مؤكد</option>
              <option value="completed">مكتمل</option>
              <option value="cancelled">ملغي</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد حجوزات</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'جرب تغيير الفلاتر أو البحث' 
                : 'احجز موعد في أحد المراكز المتاحة'}
            </p>
            <Link
              href="/"
              className="bg-ray-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              استكشف المراكز
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Booking Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{booking.bookingNumber}</h3>
                        <p className="text-sm text-gray-600">{booking.merchant}</p>
                        <p className="text-sm font-medium text-gray-800 mt-1">{booking.service}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusLabel(booking.status)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.location}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">السعر:</span>
                        <span className="font-medium text-gray-900">{booking.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/merchant/${booking.merchantId}`}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      عرض المركز
                    </Link>
                    <button 
                      onClick={() => setSelectedBooking(booking)}
                      className="px-4 py-2 bg-ray-blue text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      تفاصيل الحجز
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">تفاصيل الحجز</h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Booking Info */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{selectedBooking.bookingNumber}</h3>
                    <p className="text-gray-600">{selectedBooking.merchant}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBooking.status)}`}>
                    {getStatusLabel(selectedBooking.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">الخدمة:</span>
                    <p className="font-medium">{selectedBooking.service}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">التاريخ:</span>
                    <p className="font-medium">{selectedBooking.date}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">الوقت:</span>
                    <p className="font-medium">{selectedBooking.time}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">المدة:</span>
                    <p className="font-medium">{selectedBooking.duration}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">السعر:</span>
                    <p className="font-medium text-lg">{selectedBooking.price}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">المدفوع:</span>
                    <p className="font-medium">{selectedBooking.paid}</p>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-4">تفاصيل الخدمة</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h5 className="font-medium">{selectedBooking.service}</h5>
                      <p className="text-sm text-gray-600">خدمة احترافية مع أفضل الخبراء</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>• استشارة متخصصة</p>
                    <p>• ضمان الجودة</p>
                    <p>• دعم فني مستمر</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-4">موقع الخدمة</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">{selectedBooking.location}</p>
                      <p className="text-sm text-gray-600">القاهرة، مصر</p>
                      <p className="text-sm text-gray-600">الطابق الثاني، بجانب المصعد</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">تتبع الحجز</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">تم تأكيد الحجز</p>
                      <p className="text-sm text-gray-600">{selectedBooking.date}، 9:00 ص</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">جاري التحضير</p>
                      <p className="text-sm text-gray-600">{selectedBooking.date}، 10:00 ص</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-500">موعد الحجز</p>
                      <p className="text-sm text-gray-400">{selectedBooking.date}، {selectedBooking.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200">
              {isEditing ? (
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900">تعديل الحجز</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        التاريخ
                      </label>
                      <input
                        type="date"
                        value={editedBooking?.date || ''}
                        onChange={(e) => setEditedBooking(prev => prev ? {...prev, date: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        الوقت
                      </label>
                      <input
                        type="time"
                        value={editedBooking?.time || ''}
                        onChange={(e) => setEditedBooking(prev => prev ? {...prev, time: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ray-blue"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        الخدمة
                      </label>
                      <input
                        type="text"
                        value={editedBooking?.service || ''}
                        onChange={(e) => setEditedBooking(prev => prev ? {...prev, service: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        الموقع
                      </label>
                      <input
                        type="text"
                        value={editedBooking?.location || ''}
                        onChange={(e) => setEditedBooking(prev => prev ? {...prev, location: e.target.value} : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 px-4 py-2 bg-ray-blue text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      حفظ التعديلات
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    إغلاق
                  </button>
                  <button 
                    onClick={handleEditBooking}
                    className="flex-1 px-4 py-2 bg-ray-blue text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    تعديل الحجز
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
