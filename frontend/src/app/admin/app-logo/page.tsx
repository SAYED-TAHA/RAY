'use client';

import React, { useState } from 'react';
import { ImageIcon, Upload, Trash2, Save } from 'lucide-react';
import Link from 'next/link';

export default function AdminAppLogo() {
  const [logo, setLogo] = useState('/logo.png');
  const [favicon, setFavicon] = useState('/favicon.ico');

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
                <h1 className="text-2xl font-bold text-gray-900">شعار التطبيق</h1>
                <p className="text-sm text-gray-600">تغيير الشعار والأيقونة</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Save className="w-4 h-4" />
              حفظ
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">الشعار الرئيسي</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center mb-4 border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">الشعار الحالي</p>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  <Upload className="w-4 h-4" />
                  رفع شعار جديد
                </button>
              </div>

              <div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">الحجم الموصى به</p>
                    <p className="text-sm text-gray-600">250x60 بكسل</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">الصيغ المدعومة</p>
                    <p className="text-sm text-gray-600">PNG, JPG, SVG</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">الحد الأقصى للحجم</p>
                    <p className="text-sm text-gray-600">5 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">أيقونة المتصفح (Favicon)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center mb-4 border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">الأيقونة الحالية</p>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  <Upload className="w-4 h-4" />
                  رفع أيقونة جديدة
                </button>
              </div>

              <div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">الحجم الموصى به</p>
                    <p className="text-sm text-gray-600">32x32 بكسل</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">الصيغ المدعومة</p>
                    <p className="text-sm text-gray-600">ICO, PNG</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">الحد الأقصى للحجم</p>
                    <p className="text-sm text-gray-600">1 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
