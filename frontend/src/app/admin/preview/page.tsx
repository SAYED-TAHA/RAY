'use client';

import React, { useState } from 'react';
import { Eye, Smartphone, Tablet, Monitor, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function AdminPreview() {
  const [device, setDevice] = useState('desktop');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const getDeviceWidth = () => {
    switch(device) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-2xl';
      default: return 'w-full';
    }
  };

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
                <h1 className="text-2xl font-bold text-gray-900">معاينة التغييرات</h1>
                <p className="text-sm text-gray-600">معاينة الموقع على أجهزة مختلفة</p>
              </div>
            </div>
            <button onClick={handleRefresh} disabled={refreshing} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition">
              {refreshing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              {refreshing ? 'جاري التحديث...' : 'تحديث'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex gap-3">
            <button onClick={() => setDevice('mobile')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${device === 'mobile' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              <Smartphone className="w-4 h-4" />
              الهاتف
            </button>
            <button onClick={() => setDevice('tablet')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${device === 'tablet' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              <Tablet className="w-4 h-4" />
              الجهاز اللوحي
            </button>
            <button onClick={() => setDevice('desktop')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${device === 'desktop' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              <Monitor className="w-4 h-4" />
              سطح المكتب
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className={`${getDeviceWidth()} bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden`}>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-2">معاينة الموقع</h2>
              <p className="text-blue-100">هذه معاينة لكيفية ظهور الموقع على {device === 'mobile' ? 'الهاتف الذكي' : device === 'tablet' ? 'الجهاز اللوحي' : 'سطح المكتب'}</p>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">الرئيسية</h3>
                  <div className="bg-gray-100 rounded-lg p-6 text-center text-gray-600">
                    <p>محتوى الصفحة الرئيسية</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">المنتجات</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="bg-gray-100 rounded-lg p-4 text-center text-gray-600">
                        <p>منتج {i}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">الخدمات</h3>
                  <div className="bg-gray-100 rounded-lg p-6 text-center text-gray-600">
                    <p>محتوى الخدمات</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">اتصل بنا</h3>
                  <div className="bg-gray-100 rounded-lg p-6 text-center text-gray-600">
                    <p>نموذج الاتصال</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-white p-8 text-center">
              <p className="text-sm">© 2025 راي للتقنية. جميع الحقوق محفوظة.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
