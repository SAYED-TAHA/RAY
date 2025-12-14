'use client';

import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Users, BarChart3, Loader } from 'lucide-react';
import Link from 'next/link';

interface ConversionData {
  source: string;
  visitors: number;
  conversions: number;
  rate: number;
  trend: 'up' | 'down';
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminConversions() {
  const [conversionData, setConversionData] = useState<ConversionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConversions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/admin/conversions`);
        if (response.ok) {
          const data = await response.json();
          setConversionData(data);
        }
      } catch (error) {
        console.error('خطأ في جلب بيانات التحويلات:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversions();
  }, []);

  const totalVisitors = conversionData.reduce((sum, item) => sum + item.visitors, 0);
  const totalConversions = conversionData.reduce((sum, item) => sum + item.conversions, 0);
  const overallRate = ((totalConversions / totalVisitors) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Target className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">معدل التحويل</h1>
                <p className="text-sm text-gray-600">تحليل معدلات التحويل حسب المصدر</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">إجمالي الزيارات</p>
            <p className="text-3xl font-bold text-gray-900">{totalVisitors.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">إجمالي التحويلات</p>
            <p className="text-3xl font-bold text-green-600">{totalConversions.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">معدل التحويل العام</p>
            <p className="text-3xl font-bold text-blue-600">{overallRate}%</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">أفضل مصدر</p>
            <p className="text-3xl font-bold text-purple-600">17.53%</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المصدر</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الزيارات</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التحويلات</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">معدل التحويل</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الاتجاه</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {conversionData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{item.visitors.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-green-600">{item.conversions}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                        {item.rate.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`flex items-center gap-1 text-sm font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        <TrendingUp className="w-4 h-4" />
                        {item.trend === 'up' ? 'صاعد' : 'هابط'}
                      </span>
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
