'use client';

import React, { useState } from 'react';
import { Building2, Plus, Edit, Trash2, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function AdminBusinessJobs() {
  const businessJobs = [
    { id: 1, title: 'مدير متجر', business: 'متجر الإلكترونيات', positions: 3, salary: '5000-7000', applicants: 12, status: 'open' },
    { id: 2, title: 'موظف مبيعات', business: 'متجر الملابس', positions: 5, salary: '3000-4000', applicants: 28, status: 'open' },
    { id: 3, title: 'مسؤول عمليات', business: 'السوق المفتوح', positions: 2, salary: '6000-8000', applicants: 8, status: 'closed' },
    { id: 4, title: 'مستشار خدمة العملاء', business: 'خدمات الاستشارات', positions: 4, salary: '2500-3500', applicants: 15, status: 'open' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Building2 className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">وظائف الأنشطة</h1>
                <p className="text-sm text-gray-600">وظائف الأنشطة التجارية</p>
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
        <div className="space-y-4">
          {businessJobs.map(job => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.business}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  job.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {job.status === 'open' ? 'مفتوح' : 'مغلق'}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">الوظائف</p>
                    <p className="font-medium text-gray-900">{job.positions}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">الراتب</p>
                    <p className="font-medium text-gray-900">{job.salary}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600">المتقدمون</p>
                  <p className="font-medium text-gray-900">{job.applicants}</p>
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
