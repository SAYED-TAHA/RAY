'use client';

import React, { useState } from 'react';
import { ToggleRight, Plus, Edit, Eye, EyeOff, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminButtons() {
  const [buttons, setButtons] = useState([
    { id: 1, label: 'اشتري الآن', location: 'header', visible: true, color: 'blue', action: 'purchase' },
    { id: 2, label: 'تسجيل الدخول', location: 'header', visible: true, color: 'green', action: 'login' },
    { id: 3, label: 'إنشاء حساب', location: 'header', visible: true, color: 'purple', action: 'signup' },
    { id: 4, label: 'اتصل بنا', location: 'footer', visible: true, color: 'orange', action: 'contact' },
    { id: 5, label: 'تحميل التطبيق', location: 'sidebar', visible: true, color: 'red', action: 'download' },
    { id: 6, label: 'عرض خاص', location: 'banner', visible: false, color: 'yellow', action: 'offer' },
    { id: 7, label: 'اشترك الآن', location: 'popup', visible: true, color: 'indigo', action: 'subscribe' },
    { id: 8, label: 'اعرف المزيد', location: 'content', visible: true, color: 'cyan', action: 'learn' }
  ]);

  const toggleVisibility = (id: number) => {
    setButtons(buttons.map(btn => btn.id === id ? {...btn, visible: !btn.visible} : btn));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <ToggleRight className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الأزرار</h1>
                <p className="text-sm text-gray-600">إدارة أزرار الموقع</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
              زر جديد
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
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">النص</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الموقع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">اللون</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراء</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الرؤية</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {buttons.map(btn => (
                  <tr key={btn.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{btn.label}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{btn.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded bg-${btn.color}-500`}></div>
                        <span className="text-sm text-gray-600">{btn.color}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{btn.action}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => toggleVisibility(btn.id)} className={`p-2 rounded-lg transition ${btn.visible ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                        {btn.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900"><Edit className="w-4 h-4" /></button>
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
