'use client';

import React, { useState } from 'react';
import { GraduationCap, Plus, Edit, Trash2, Users, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminTraining() {
  const trainings = [
    { id: 1, name: 'تدريب React المتقدم', instructor: 'أحمد محمد', participants: 25, startDate: '2025-12-10', status: 'upcoming', duration: '4 أسابيع' },
    { id: 2, name: 'تدريب إدارة المشاريع', instructor: 'سارة أحمد', participants: 18, startDate: '2025-12-01', status: 'ongoing', duration: '6 أسابيع' },
    { id: 3, name: 'تدريب مهارات القيادة', instructor: 'محمد علي', participants: 30, startDate: '2025-11-15', status: 'completed', duration: '3 أسابيع' },
    { id: 4, name: 'تدريب البيانات الضخمة', instructor: 'فاطمة حسن', participants: 22, startDate: '2025-12-20', status: 'upcoming', duration: '5 أسابيع' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <GraduationCap className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">برامج التدريب</h1>
                <p className="text-sm text-gray-600">إدارة برامج التدريب والتطوير</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
              برنامج جديد
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {trainings.map(training => (
            <div key={training.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{training.name}</h3>
                  <p className="text-sm text-gray-600">المدرب: {training.instructor}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  training.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                  training.status === 'ongoing' ? 'bg-orange-100 text-orange-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {training.status === 'upcoming' ? 'قادم' : training.status === 'ongoing' ? 'جاري' : 'مكتمل'}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">المشاركون</p>
                    <p className="font-medium text-gray-900">{training.participants}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">التاريخ</p>
                    <p className="font-medium text-gray-900">{training.startDate}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600">المدة</p>
                  <p className="font-medium text-gray-900">{training.duration}</p>
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
