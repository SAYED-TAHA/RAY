/**
 * تحليلات الملابس
 * تحليلات متقدمة وتقارير شاملة
 */

import React, { useState } from 'react';
import {
  BarChart3, LineChart, TrendingUp, Calendar, Download,
  Filter, Eye, AlertCircle
} from 'lucide-react';
import { BarChart, Bar, LineChart as LineChartComponent, Line, PieChart as PieChartComponent, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalesData {
  month: string;
  sales: number;
  profit: number;
  items: number;
}

const salesData: SalesData[] = [
  { month: 'يناير', sales: 35000, profit: 7000, items: 120 },
  { month: 'فبراير', sales: 42000, profit: 8400, items: 145 },
  { month: 'مارس', sales: 38000, profit: 7600, items: 130 },
  { month: 'أبريل', sales: 51000, profit: 10200, items: 175 },
  { month: 'مايو', sales: 45000, profit: 9000, items: 155 },
  { month: 'يونيو', sales: 57000, profit: 11400, items: 195 },
];

const ClothingAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('6months');

  const totalSales = salesData.reduce((sum, d) => sum + d.sales, 0);
  const totalProfit = salesData.reduce((sum, d) => sum + d.profit, 0);
  const totalItems = salesData.reduce((sum, d) => sum + d.items, 0);
  const avgOrderValue = totalSales / totalItems;

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            تحليلات الملابس
          </h2>
          <p className="text-sm text-gray-500">تحليلات متقدمة وتقارير شاملة</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          <Download className="w-5 h-5" />
          تحميل التقرير
        </button>
      </div>

      {/* Date Range Filter */}
      <div className="flex gap-4">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="1month">آخر شهر</option>
          <option value="3months">آخر 3 أشهر</option>
          <option value="6months">آخر 6 أشهر</option>
          <option value="1year">آخر سنة</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">إجمالي المبيعات</p>
          <p className="text-2xl font-bold text-gray-900">{(totalSales / 1000).toFixed(0)}K</p>
          <p className="text-xs text-green-600 mt-1">↑ 18% من الشهر السابق</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">إجمالي الأرباح</p>
          <p className="text-2xl font-bold text-gray-900">{(totalProfit / 1000).toFixed(0)}K</p>
          <p className="text-xs text-green-600 mt-1">↑ 20% من الشهر السابق</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">عدد المنتجات المباعة</p>
          <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
          <p className="text-xs text-green-600 mt-1">↑ 12% من الشهر السابق</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">متوسط قيمة الطلب</p>
          <p className="text-2xl font-bold text-gray-900">{avgOrderValue.toFixed(0)} ج</p>
          <p className="text-xs text-green-600 mt-1">↑ 8% من الشهر السابق</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales & Profit Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <LineChart className="w-5 h-5 text-blue-600" />
            المبيعات والأرباح
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChartComponent data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" name="المبيعات" />
              <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="الأرباح" />
            </LineChartComponent>
          </ResponsiveContainer>
        </div>

        {/* Monthly Comparison */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-600" />
            مقارنة شهرية
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" name="المبيعات" />
              <Bar dataKey="items" fill="#82ca9d" name="المنتجات" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ClothingAnalytics;
