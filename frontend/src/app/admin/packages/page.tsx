'use client';

import React, { useState } from 'react';
import { Package, Star, Check, Edit, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminPackages() {
  const packages = [
    { id: 1, name: 'الباقة الأساسية', price: 99, users: 1234, subscriptions: 892, revenue: 88208, popular: false },
    { id: 2, name: 'الباقة المميزة', price: 299, users: 2345, subscriptions: 1567, revenue: 468533, popular: true },
    { id: 3, name: 'الباقة الذهبية', price: 599, users: 890, subscriptions: 678, revenue: 405922, popular: false },
    { id: 4, name: 'الباقة المؤسسية', price: 999, users: 234, subscriptions: 189, revenue: 188811, popular: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Package className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الباقات</h1>
                <p className="text-sm text-gray-600">إدارة باقات الاشتراك</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
              باقة جديدة
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map(pkg => (
            <div key={pkg.id} className={`rounded-xl shadow-sm border p-6 ${pkg.popular ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">{pkg.name}</h3>
                {pkg.popular && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
              </div>
              
              <p className="text-3xl font-bold text-gray-900 mb-4">{pkg.price} ج.م</p>
              
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">المستخدمون</span>
                  <span className="font-medium">{pkg.users.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الاشتراكات</span>
                  <span className="font-medium">{pkg.subscriptions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الإيرادات</span>
                  <span className="font-medium text-green-600">{pkg.revenue.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  <Edit className="w-4 h-4" />
                  تعديل
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  <Trash2 className="w-4 h-4" />
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
