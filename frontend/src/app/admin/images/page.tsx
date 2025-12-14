'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Trash2, Download, Eye } from 'lucide-react';
import Link from 'next/link';

export default function AdminImages() {
  const images = [
    { id: 1, name: 'شعار الموقع', size: '245 KB', type: 'logo', location: 'header', uploadDate: '2025-12-01' },
    { id: 2, name: 'صورة البطل', size: '1.2 MB', type: 'hero', location: 'homepage', uploadDate: '2025-12-02' },
    { id: 3, name: 'صورة الفريق', size: '856 KB', type: 'team', location: 'about', uploadDate: '2025-12-03' },
    { id: 4, name: 'أيقونة الخدمات', size: '125 KB', type: 'icon', location: 'services', uploadDate: '2025-12-04' },
    { id: 5, name: 'صورة المنتج 1', size: '567 KB', type: 'product', location: 'products', uploadDate: '2025-12-05' },
    { id: 6, name: 'صورة المنتج 2', size: '634 KB', type: 'product', location: 'products', uploadDate: '2025-12-05' },
    { id: 7, name: 'خلفية الفوتر', size: '789 KB', type: 'background', location: 'footer', uploadDate: '2025-12-04' },
    { id: 8, name: 'شهادات العملاء', size: '456 KB', type: 'testimonial', location: 'homepage', uploadDate: '2025-12-03' },
    { id: 9, name: 'صورة الإعلان', size: '923 KB', type: 'banner', location: 'ads', uploadDate: '2025-12-05' },
    { id: 10, name: 'أيقونة الميزات', size: '234 KB', type: 'icon', location: 'features', uploadDate: '2025-12-02' },
    { id: 11, name: 'صورة المدونة', size: '678 KB', type: 'blog', location: 'blog', uploadDate: '2025-12-01' },
    { id: 12, name: 'شهادة الجودة', size: '345 KB', type: 'certificate', location: 'about', uploadDate: '2025-11-30' },
    { id: 13, name: 'خريطة الموقع', size: '512 KB', type: 'map', location: 'contact', uploadDate: '2025-12-03' },
    { id: 14, name: 'صورة الشراكات', size: '789 KB', type: 'partner', location: 'partnerships', uploadDate: '2025-12-04' },
    { id: 15, name: 'أيقونة التطبيق', size: '156 KB', type: 'icon', location: 'app', uploadDate: '2025-12-05' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <ImageIcon className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الصور والأيقونات</h1>
                <p className="text-sm text-gray-600">إدارة صور وأيقونات الموقع</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
              رفع صورة
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
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الاسم</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">النوع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الموقع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحجم</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ الرفع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {images.map(img => (
                  <tr key={img.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{img.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                        {img.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{img.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{img.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{img.uploadDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900"><Eye className="w-4 h-4" /></button>
                        <button className="text-green-600 hover:text-green-900"><Download className="w-4 h-4" /></button>
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
