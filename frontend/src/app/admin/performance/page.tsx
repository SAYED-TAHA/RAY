'use client';

import React, { useState } from 'react';
import { Zap, TrendingUp, Activity, AlertCircle, CheckCircle, Clock, BarChart3, LineChart } from 'lucide-react';
import Link from 'next/link';

export default function AdminPerformance() {
  const [selectedMetric, setSelectedMetric] = useState('all');

  const metrics = [
    { name: 'سرعة التحميل', value: '1.2s', target: '2s', status: 'excellent', trend: -15 },
    { name: 'معدل الخطأ', value: '0.1%', target: '1%', status: 'excellent', trend: -5 },
    { name: 'استخدام الذاكرة', value: '45%', target: '70%', status: 'good', trend: 3 },
    { name: 'استخدام CPU', value: '32%', target: '80%', status: 'excellent', trend: -8 },
    { name: 'توفر الخدمة', value: '99.9%', target: '99%', status: 'excellent', trend: 0 },
    { name: 'زمن الاستجابة', value: '245ms', target: '500ms', status: 'excellent', trend: -12 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Zap className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">مراقبة الأداء</h1>
                <p className="text-sm text-gray-600">تتبع أداء النظام والتطبيق</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">{metric.name}</h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  metric.status === 'excellent' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {metric.status === 'excellent' ? 'ممتاز' : 'جيد'}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-xs text-gray-600 mt-1">الهدف: {metric.target}</p>
                </div>
                <div className={`text-sm font-medium ${metric.trend < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.trend < 0 ? '↓' : '↑'} {Math.abs(metric.trend)}%
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">التنبيهات</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">جميع الأنظمة تعمل بشكل طبيعي</p>
                <p className="text-xs text-green-700">آخر تحديث: الآن</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
