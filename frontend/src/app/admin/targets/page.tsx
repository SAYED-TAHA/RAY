'use client';

import React, { useState } from 'react';
import { Target, TrendingUp, CheckCircle, AlertCircle, Calendar, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminTargets() {
  const targets = [
    { id: 1, name: 'زيادة المستخدمين', target: 20000, current: 15234, progress: 76, deadline: '2025-12-31', status: 'on-track' },
    { id: 2, name: 'الإيرادات الشهرية', target: 5000000, current: 2456789, progress: 49, deadline: '2025-12-31', status: 'at-risk' },
    { id: 3, name: 'رضا العملاء', target: 95, current: 92, progress: 97, deadline: '2025-12-31', status: 'on-track' },
    { id: 4, name: 'تقليل الأخطاء', target: 0.05, current: 0.1, progress: 50, deadline: '2025-12-31', status: 'at-risk' }
  ];

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
                <h1 className="text-2xl font-bold text-gray-900">الأهداف</h1>
                <p className="text-sm text-gray-600">تتبع أهداف الشركة والمشاريع</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
              هدف جديد
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {targets.map(target => (
            <div key={target.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{target.name}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  target.status === 'on-track' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {target.status === 'on-track' ? 'على المسار' : 'معرض للخطر'}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">الهدف</p>
                  <p className="text-lg font-bold text-gray-900">{target.target.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">الحالي</p>
                  <p className="text-lg font-bold text-blue-600">{target.current.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">الموعد</p>
                  <p className="text-lg font-bold text-gray-900">{target.deadline}</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: `${target.progress}%` }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{target.progress}% مكتمل</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
