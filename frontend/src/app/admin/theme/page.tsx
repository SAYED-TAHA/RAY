'use client';

import React, { useState } from 'react';
import { Eye, Save, Moon, Sun } from 'lucide-react';
import Link from 'next/link';

export default function AdminTheme() {
  const [theme, setTheme] = useState('light');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Eye className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الوضع الليلي والثيم</h1>
                <p className="text-sm text-gray-600">تغيير مظهر الموقع</p>
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
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6">اختر الثيم</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button onClick={() => setTheme('light')} className={`p-6 rounded-lg border-2 transition ${theme === 'light' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">الوضع الفاتح</h3>
              <p className="text-sm text-gray-600">خلفية بيضاء ونصوص سوداء</p>
            </button>

            <button onClick={() => setTheme('dark')} className={`p-6 rounded-lg border-2 transition ${theme === 'dark' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              <Moon className="w-8 h-8 text-gray-700 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">الوضع الغامق</h3>
              <p className="text-sm text-gray-600">خلفية سوداء ونصوص بيضاء</p>
            </button>

            <button onClick={() => setTheme('auto')} className={`p-6 rounded-lg border-2 transition ${theme === 'auto' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              <div className="flex gap-2 justify-center mb-3">
                <Sun className="w-4 h-4 text-yellow-500" />
                <Moon className="w-4 h-4 text-gray-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">تلقائي</h3>
              <p className="text-sm text-gray-600">حسب إعدادات النظام</p>
            </button>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-3">معاينة</h3>
            <div className={`p-4 rounded-lg ${theme === 'light' ? 'bg-white text-gray-900 border border-gray-200' : theme === 'dark' ? 'bg-gray-900 text-white border border-gray-700' : 'bg-gray-100 text-gray-900 border border-gray-300'}`}>
              <p className="font-medium">هذه معاينة لمظهر الموقع</p>
              <p className="text-sm mt-2">سيتم تطبيق هذا الثيم على جميع صفحات الموقع</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
