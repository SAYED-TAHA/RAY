'use client';

import React, { useState } from 'react';
import { Handshake, Users, CheckCircle, Clock, AlertCircle, Plus, Filter } from 'lucide-react';
import Link from 'next/link';

export default function AdminHiring() {
  const hiringProcesses = [
    { id: 1, position: 'مطور Frontend', stage: 'المقابلة النهائية', candidates: 3, progress: 75, deadline: '2025-12-15' },
    { id: 2, position: 'مصممة UI/UX', stage: 'المقابلة التقنية', candidates: 5, progress: 50, deadline: '2025-12-20' },
    { id: 3, position: 'مطور Backend', stage: 'العرض', candidates: 1, progress: 90, deadline: '2025-12-10' },
    { id: 4, position: 'مساعدة تسويق', stage: 'الفلترة الأولية', candidates: 12, progress: 25, deadline: '2025-12-25' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Handshake className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">عملية التوظيف</h1>
                <p className="text-sm text-gray-600">إدارة عمليات التوظيف والمرشحين</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
              وظيفة جديدة
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">الوظائف المفتوحة</p>
            <p className="text-2xl font-bold text-gray-900">4</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">إجمالي المرشحين</p>
            <p className="text-2xl font-bold text-blue-600">21</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">في المقابلات</p>
            <p className="text-2xl font-bold text-orange-600">9</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">عروض معلقة</p>
            <p className="text-2xl font-bold text-green-600">1</p>
          </div>
        </div>

        <div className="space-y-4">
          {hiringProcesses.map(process => (
            <div key={process.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{process.position}</h3>
                  <p className="text-sm text-gray-600">{process.candidates} مرشح • المرحلة: {process.stage}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">الموعد النهائي</p>
                  <p className="text-sm font-medium text-gray-900">{process.deadline}</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${process.progress}%` }}></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">{process.progress}% مكتمل</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
