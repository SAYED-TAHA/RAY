'use client';

import React, { useState } from 'react';
import { Percent, Plus, Edit, Trash2, Copy, Check } from 'lucide-react';
import Link from 'next/link';

export default function AdminDiscounts() {
  const discounts = [
    { id: 1, code: 'SAVE20', type: 'percentage', value: 20, usage: 234, maxUse: 500, status: 'active', expiry: '2025-12-31' },
    { id: 2, code: 'WELCOME', type: 'fixed', value: 100, usage: 567, maxUse: 1000, status: 'active', expiry: '2025-12-25' },
    { id: 3, code: 'SUMMER50', type: 'percentage', value: 50, usage: 89, maxUse: 200, status: 'expired', expiry: '2025-11-30' },
    { id: 4, code: 'VIP30', type: 'percentage', value: 30, usage: 123, maxUse: 300, status: 'active', expiry: '2026-01-31' },
    { id: 5, code: 'FLASH15', type: 'percentage', value: 15, usage: 456, maxUse: 800, status: 'active', expiry: '2025-12-20' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Percent className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الخصومات</h1>
                <p className="text-sm text-gray-600">إدارة أكواد وخصومات الترويج</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
              خصم جديد
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {discounts.map(discount => (
            <div key={discount.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Percent className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{discount.code}</h3>
                    <p className="text-sm text-gray-600">
                      {discount.type === 'percentage' ? `خصم ${discount.value}%` : `خصم ${discount.value} ج.م`}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  discount.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {discount.status === 'active' ? 'نشط' : 'منتهي'}
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600">الاستخدام</p>
                  <p className="font-medium text-gray-900">{discount.usage}/{discount.maxUse}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">النسبة</p>
                  <p className="font-medium text-gray-900">{((discount.usage/discount.maxUse)*100).toFixed(0)}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">الصلاحية</p>
                  <p className="font-medium text-gray-900">{discount.expiry}</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
