'use client';

import React, { useState } from 'react';
import { Home, Edit, Eye, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminMainPages() {
  const pages = [
    { id: 1, title: 'الرئيسية', slug: 'home', status: 'published', views: 5234, lastModified: '2025-12-05' },
    { id: 2, title: 'من نحن', slug: 'about', status: 'published', views: 1234, lastModified: '2025-12-03' },
    { id: 3, title: 'الخدمات', slug: 'services', status: 'published', views: 3456, lastModified: '2025-12-04' },
    { id: 4, title: 'اتصل بنا', slug: 'contact', status: 'published', views: 2123, lastModified: '2025-12-02' },
    { id: 5, title: 'المدونة', slug: 'blog', status: 'draft', views: 0, lastModified: '2025-12-01' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Home className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الصفحات الرئيسية</h1>
                <p className="text-sm text-gray-600">إدارة الصفحات الأساسية</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
              صفحة جديدة
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العنوان</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المشاهدات</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">آخر تعديل</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pages.map(page => (
                  <tr key={page.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{page.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {page.status === 'published' ? 'منشورة' : 'مسودة'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{page.views.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{page.lastModified}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900"><Edit className="w-4 h-4" /></button>
                        <button className="text-green-600 hover:text-green-900"><Eye className="w-4 h-4" /></button>
                        <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                      </div>
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
