/**
 * قائمة الحجوزات
 * عرض وإدارة قائمة الحجوزات
 */

import React, { useState } from 'react';
import {
  Search, Filter, Download, Plus, Edit, Trash2, Eye,
  Phone, MessageSquare, MapPin, Clock, Users, CheckCircle,
  AlertCircle, X, MoreVertical
} from 'lucide-react';

interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  date: string;
  time: string;
  duration: number;
  service: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  location?: string;
  notes?: string;
  guests?: number;
  amount?: number;
}

const initialBookings: Booking[] = [
  {
    id: 'bk-001',
    clientName: 'أحمد محمد',
    clientPhone: '+201001234567',
    clientEmail: 'ahmed@example.com',
    date: '2024-12-06',
    time: '10:00',
    duration: 60,
    service: 'استشارة',
    status: 'confirmed',
    location: 'العيادة الرئيسية',
    guests: 1,
    amount: 250
  },
  {
    id: 'bk-002',
    clientName: 'فاطمة علي',
    clientPhone: '+201101234567',
    clientEmail: 'fatima@example.com',
    date: '2024-12-06',
    time: '14:00',
    duration: 90,
    service: 'جلسة كاملة',
    status: 'confirmed',
    location: 'الفرع الثاني',
    guests: 1,
    amount: 500
  },
  {
    id: 'bk-003',
    clientName: 'محمود حسن',
    clientPhone: '+201201234567',
    clientEmail: 'mahmoud@example.com',
    date: '2024-12-07',
    time: '11:00',
    duration: 60,
    service: 'متابعة',
    status: 'pending',
    location: 'العيادة الرئيسية',
    guests: 1,
    amount: 200
  },
  {
    id: 'bk-004',
    clientName: 'سارة أحمد',
    clientPhone: '+201301234567',
    clientEmail: 'sarah@example.com',
    date: '2024-12-07',
    time: '15:30',
    duration: 120,
    service: 'حفلة',
    status: 'confirmed',
    location: 'الفرع الثالث',
    guests: 8,
    amount: 2000
  },
  {
    id: 'bk-005',
    clientName: 'علي محمود',
    clientPhone: '+201401234567',
    clientEmail: 'ali@example.com',
    date: '2024-12-08',
    time: '09:00',
    duration: 45,
    service: 'فحص سريع',
    status: 'completed',
    location: 'العيادة الرئيسية',
    guests: 1,
    amount: 150
  }
];

const BookingsList: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'pending' | 'completed' | 'cancelled'>('all');
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.clientName.includes(searchTerm) || booking.clientPhone.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleBookingSelection = (id: string) => {
    setSelectedBookings(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'مؤكد';
      case 'pending': return 'معلق';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغى';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            قائمة الحجوزات
          </h2>
          <p className="text-sm text-gray-500">إدارة جميع الحجوزات</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus className="w-5 h-5" />
          حجز جديد
        </button>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن العميل أو الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">الكل</option>
          <option value="confirmed">مؤكد</option>
          <option value="pending">معلق</option>
          <option value="completed">مكتمل</option>
          <option value="cancelled">ملغى</option>
        </select>

        {/* Export */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
          <Download className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedBookings(filteredBookings.map(b => b.id));
                      } else {
                        setSelectedBookings([]);
                      }
                    }}
                    className="rounded"
                  />
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">العميل</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">التاريخ والوقت</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الخدمة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">المدة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">المبلغ</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map(booking => (
                <tr key={booking.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedBookings.includes(booking.id)}
                      onChange={() => toggleBookingSelection(booking.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{booking.clientName}</p>
                      <p className="text-xs text-gray-500">{booking.clientPhone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {booking.date} {booking.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{booking.service}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{booking.duration} دقيقة</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      {getStatusLabel(booking.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{booking.amount} ج</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition">
                        <MessageSquare className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-red-100 rounded transition">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            عرض <span className="font-semibold">{filteredBookings.length}</span> من <span className="font-semibold">{bookings.length}</span> حجز
          </p>
          {selectedBookings.length > 0 && (
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition">
                حذف المحدد
              </button>
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition">
                تصدير
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsList;
