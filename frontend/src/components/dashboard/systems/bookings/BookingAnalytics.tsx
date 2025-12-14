/**
 * تحليلات الحجوزات
 * تحليلات متقدمة للحجوزات
 */

import React, { useState } from 'react';
import {
  BarChart3, LineChart, TrendingUp, Calendar, Download
} from 'lucide-react';
import { BarChart, Bar, LineChart as LineChartComponent, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BookingData {
  date: string;
  bookings: number;
  revenue: number;
  completed: number;
}

const bookingData: BookingData[] = [
  { date: 'الأحد', bookings: 12, revenue: 3600, completed: 10 },
  { date: 'الاثنين', bookings: 15, revenue: 4500, completed: 14 },
  { date: 'الثلاثاء', bookings: 18, revenue: 5400, completed: 17 },
  { date: 'الأربعاء', bookings: 14, revenue: 4200, completed: 13 },
  { date: 'الخميس', bookings: 20, revenue: 6000, completed: 19 },
  { date: 'الجمعة', bookings: 25, revenue: 7500, completed: 24 },
  { date: 'السبت', bookings: 22, revenue: 6600, completed: 21 },
];

const BookingAnalytics: React.FC = () => {
  const totalBookings = bookingData.reduce((sum, d) => sum + d.bookings, 0);
  const totalRevenue = bookingData.reduce((sum, d) => sum + d.revenue, 0);
  const completionRate = ((bookingData.reduce((sum, d) => sum + d.completed, 0) / totalBookings) * 100).toFixed(1);

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            تحليلات الحجوزات
          </h2>
          <p className="text-sm text-gray-500">تحليلات متقدمة للحجوزات</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Download className="w-5 h-5" />
          تحميل التقرير
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">إجمالي الحجوزات</p>
          <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
          <p className="text-xs text-green-600 mt-1">↑ 15% من الأسبوع السابق</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">إجمالي الإيرادات</p>
          <p className="text-2xl font-bold text-gray-900">{(totalRevenue / 1000).toFixed(1)}K</p>
          <p className="text-xs text-green-600 mt-1">↑ 20% من الأسبوع السابق</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">معدل الإكمال</p>
          <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
          <p className="text-xs text-green-600 mt-1">↑ 5% من الأسبوع السابق</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">متوسط الحجز</p>
          <p className="text-2xl font-bold text-gray-900">{(totalRevenue / totalBookings).toFixed(0)} ج</p>
          <p className="text-xs text-green-600 mt-1">↑ 8% من الأسبوع السابق</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <LineChart className="w-5 h-5 text-blue-600" />
            الحجوزات اليومية
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChartComponent data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bookings" stroke="#8884d8" name="الحجوزات" />
              <Line type="monotone" dataKey="completed" stroke="#82ca9d" name="المكتملة" />
            </LineChartComponent>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            الإيرادات اليومية
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" name="الإيرادات" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BookingAnalytics;
