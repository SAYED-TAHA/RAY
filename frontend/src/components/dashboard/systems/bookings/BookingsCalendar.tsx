/**
 * تقويم الحجوزات
 * عرض وإدارة الحجوزات على التقويم
 */

import React, { useState } from 'react';
import {
  Calendar, ChevronLeft, ChevronRight, Plus, Clock, Users, MapPin,
  Phone, MessageSquare, Check, X, AlertCircle, Settings2
} from 'lucide-react';

interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  date: string;
  time: string;
  duration: number;
  service: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
  guests?: number;
}

const initialBookings: Booking[] = [
  {
    id: 'bk-001',
    clientName: 'أحمد محمد',
    clientPhone: '+201001234567',
    date: '2024-12-06',
    time: '10:00',
    duration: 60,
    service: 'استشارة',
    status: 'confirmed',
    guests: 1
  },
  {
    id: 'bk-002',
    clientName: 'فاطمة علي',
    clientPhone: '+201101234567',
    date: '2024-12-06',
    time: '14:00',
    duration: 90,
    service: 'جلسة كاملة',
    status: 'confirmed',
    guests: 1
  },
  {
    id: 'bk-003',
    clientName: 'محمود حسن',
    clientPhone: '+201201234567',
    date: '2024-12-07',
    time: '11:00',
    duration: 60,
    service: 'متابعة',
    status: 'pending',
    guests: 1
  },
  {
    id: 'bk-004',
    clientName: 'سارة أحمد',
    clientPhone: '+201301234567',
    date: '2024-12-07',
    time: '15:30',
    duration: 120,
    service: 'حفلة',
    status: 'confirmed',
    guests: 8
  }
];

const BookingsCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 6));
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [selectedDate, setSelectedDate] = useState<string | null>('2024-12-06');
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthDays = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= monthDays; i++) {
    days.push(i);
  }

  const getBookingsForDate = (day: number) => {
    const dateStr = `2024-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookings.filter(b => b.date === dateStr);
  };

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
      case 'pending': return 'معلق';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغى';
      default: return status;
    }
  };

  const selectedDateBookings = selectedDate
    ? bookings.filter(b => b.date === selectedDate)
    : [];

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            تقويم الحجوزات
          </h2>
          <p className="text-sm text-gray-500">إدارة الحجوزات على التقويم</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus className="w-5 h-5" />
          حجز جديد
        </button>
      </div>

      {/* View Mode */}
      <div className="flex gap-2 bg-white border border-gray-200 rounded-lg p-1 w-fit">
        {['month', 'week', 'day'].map(mode => (
          <button
            key={mode}
            onClick={() => setViewMode(mode as any)}
            className={`px-4 py-2 rounded transition text-sm font-semibold ${
              viewMode === mode
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {mode === 'month' && 'شهر'}
            {mode === 'week' && 'أسبوع'}
            {mode === 'day' && 'يوم'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Month Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
            <h3 className="text-lg font-bold text-gray-800">
              {currentDate.toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="p-6">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map(day => (
                <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, idx) => {
                const dateStr = day
                  ? `2024-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                  : null;
                const dayBookings = day ? getBookingsForDate(day) : [];
                const isSelected = dateStr === selectedDate;

                return (
                  <button
                    key={idx}
                    onClick={() => dateStr && setSelectedDate(dateStr)}
                    className={`aspect-square p-2 rounded-lg border-2 transition text-sm ${
                      day
                        ? isSelected
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                        : 'border-transparent'
                    }`}
                  >
                    {day && (
                      <div className="h-full flex flex-col">
                        <span className={`font-semibold ${isSelected ? 'text-blue-600' : 'text-gray-800'}`}>
                          {day}
                        </span>
                        {dayBookings.length > 0 && (
                          <div className="mt-1 flex gap-1 flex-wrap">
                            {dayBookings.slice(0, 2).map(booking => (
                              <div
                                key={booking.id}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  booking.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                                }`}
                              />
                            ))}
                            {dayBookings.length > 2 && (
                              <span className="text-xs text-gray-500">+{dayBookings.length - 2}</span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-800">
              {selectedDate ? new Date(selectedDate).toLocaleDateString('ar-EG') : 'اختر تاريخاً'}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {selectedDateBookings.length} حجز
            </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 p-4">
            {selectedDateBookings.length === 0 ? (
              <p className="text-center text-gray-500 text-sm py-8">لا توجد حجوزات</p>
            ) : (
              selectedDateBookings.map(booking => (
                <div
                  key={booking.id}
                  className={`p-3 rounded-lg border-l-4 ${getStatusColor(booking.status)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-sm">{booking.clientName}</p>
                      <p className="text-xs text-gray-600">{booking.time}</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-white rounded">
                      {getStatusLabel(booking.status)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{booking.service}</p>
                  <div className="flex gap-1">
                    <button className="p-1 hover:bg-white/50 rounded transition">
                      <Phone className="w-3 h-3" />
                    </button>
                    <button className="p-1 hover:bg-white/50 rounded transition">
                      <MessageSquare className="w-3 h-3" />
                    </button>
                    <button className="p-1 hover:bg-white/50 rounded transition">
                      <Check className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsCalendar;
