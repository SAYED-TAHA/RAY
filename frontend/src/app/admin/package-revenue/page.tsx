'use client';

import React, { useState } from 'react';
import { TrendingUp, Download, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function AdminPackageRevenue() {
  const packageRevenue = [
    { name: 'الباقة الأساسية', revenue: 88208, subscribers: 892, monthlyGrowth: 5.2, trend: 'up' },
    { name: 'الباقة المميزة', revenue: 468533, subscribers: 1567, monthlyGrowth: 12.8, trend: 'up' },
    { name: 'الباقة الذهبية', revenue: 405922, subscribers: 678, monthlyGrowth: 8.3, trend: 'up' },
    { name: 'الباقة المؤسسية', revenue: 188811, subscribers: 189, monthlyGrowth: 15.6, trend: 'up' }
  ];

  const totalRevenue = packageRevenue.reduce((sum, pkg) => sum + pkg.revenue, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <TrendingUp className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">إيرادات الباقات</h1>
                <p className="text-sm text-gray-600">تحليل إيرادات الاشتراكات</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Download className="w-4 h-4" />
              تصدير
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">إجمالي الإيرادات</p>
            <p className="text-3xl font-bold text-green-600">{(totalRevenue/1000).toFixed(0)}K ج.م</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">عدد الباقات</p>
            <p className="text-3xl font-bold text-gray-900">4</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">إجمالي المشتركين</p>
            <p className="text-3xl font-bold text-gray-900">3,326</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">متوسط الإيرادة</p>
            <p className="text-3xl font-bold text-blue-600">{(totalRevenue/4/1000).toFixed(0)}K ج.م</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6">تفصيل الإيرادات حسب الباقة</h2>
          <div className="space-y-4">
            {packageRevenue.map((pkg, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{pkg.name}</h3>
                  <span className="text-sm font-bold text-green-600">{pkg.revenue.toLocaleString()} ج.م</span>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">المشتركون</p>
                    <p className="font-medium text-gray-900">{pkg.subscribers.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">النسبة من الإجمالي</p>
                    <p className="font-medium text-gray-900">{((pkg.revenue/totalRevenue)*100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">النمو الشهري</p>
                    <p className="font-medium text-green-600">+{pkg.monthlyGrowth}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">متوسط الإيرادة</p>
                    <p className="font-medium text-gray-900">{(pkg.revenue/pkg.subscribers).toFixed(0)} ج.م</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
