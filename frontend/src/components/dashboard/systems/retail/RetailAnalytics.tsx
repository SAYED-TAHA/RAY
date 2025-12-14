/**
 * تحليلات البيع بالتجزئة
 * تحليلات متقدمة وتقارير شاملة
 */

import React, { useState } from 'react';
import {
  BarChart3, LineChart, PieChart, TrendingUp, Calendar,
  Download, Filter, Eye, AlertCircle, CheckCircle
} from 'lucide-react';
import { BarChart, Bar, LineChart as LineChartComponent, Line, PieChart as PieChartComponent, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsData {
  month: string;
  sales: number;
  profit: number;
  customers: number;
}

interface ProductPerformance {
  name: string;
  sales: number;
  percentage: number;
}

const salesData: AnalyticsData[] = [
  { month: 'يناير', sales: 45000, profit: 9000, customers: 120 },
  { month: 'فبراير', sales: 52000, profit: 10400, customers: 135 },
  { month: 'مارس', sales: 48000, profit: 9600, customers: 128 },
  { month: 'أبريل', sales: 61000, profit: 12200, customers: 155 },
  { month: 'مايو', sales: 55000, profit: 11000, customers: 142 },
  { month: 'يونيو', sales: 67000, profit: 13400, customers: 170 },
];

const productPerformance: ProductPerformance[] = [
  { name: 'الملابس', sales: 180000, percentage: 35 },
  { name: 'الأحذية', sales: 120000, percentage: 23 },
  { name: 'الإكسسوارات', sales: 95000, percentage: 18 },
  { name: 'الحقائب', sales: 85000, percentage: 16 },
  { name: 'أخرى', sales: 40000, percentage: 8 },
];

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

const RetailAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('6months');

  const totalSales = salesData.reduce((sum, d) => sum + d.sales, 0);
  const totalProfit = salesData.reduce((sum, d) => sum + d.profit, 0);
  const totalCustomers = salesData.reduce((sum, d) => sum + d.customers, 0);
  const avgOrderValue = totalSales / totalCustomers;

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            تحليلات البيع بالتجزئة
          </h2>
          <p className="text-sm text-gray-500">تحليلات متقدمة وتقارير شاملة</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          <Download className="w-5 h-5" />
          تحميل التقرير
        </button>
      </div>

      {/* Date Range Filter */}
      <div className="flex gap-4">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
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
          <p className="text-xs text-green-600 mt-1">↑ 12% من الشهر السابق</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">إجمالي الأرباح</p>
          <p className="text-2xl font-bold text-gray-900">{(totalProfit / 1000).toFixed(0)}K</p>
          <p className="text-xs text-green-600 mt-1">↑ 15% من الشهر السابق</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">عدد العملاء</p>
          <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
          <p className="text-xs text-green-600 mt-1">↑ 8% من الشهر السابق</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">متوسط قيمة الطلب</p>
          <p className="text-2xl font-bold text-gray-900">{avgOrderValue.toFixed(0)} ج</p>
          <p className="text-xs text-green-600 mt-1">↑ 5% من الشهر السابق</p>
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

        {/* Product Performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-600" />
            أداء المنتجات
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChartComponent>
              <Pie
                data={productPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="sales"
              >
                {productPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChartComponent>
          </ResponsiveContainer>
        </div>
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
            <Bar dataKey="customers" fill="#82ca9d" name="العملاء" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RetailAnalytics;
