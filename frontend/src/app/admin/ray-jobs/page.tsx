'use client';

import React, { useState } from 'react';
import { BadgeCheck, Plus, Edit, Trash2, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function AdminRayJobs() {
  const rayJobs = [
    { id: 1, title: 'مطور Frontend', department: 'التقنية', positions: 2, salary: '15000-20000', applicants: 45, status: 'open' },
    { id: 2, title: 'مصممة UI/UX', department: 'التصميم', positions: 1, salary: '12000-15000', applicants: 23, status: 'open' },
    { id: 3, title: 'مطور Backend', department: 'التقنية', positions: 2, salary: '18000-25000', applicants: 34, status: 'open' },
    { id: 4, title: 'مدير المشاريع', department: 'الإدارة', positions: 1, salary: '16000-22000', applicants: 18, status: 'closed' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <BadgeCheck className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">وظائف راي</h1>
                <p className="text-sm text-gray-600">وظائف شركة راي</p>
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
          {rayJobs.map(job => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.department}</p>
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
