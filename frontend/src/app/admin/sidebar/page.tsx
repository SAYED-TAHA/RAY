'use client';

import React, { useState } from 'react';
import { Layout, Save } from 'lucide-react';
import Link from 'next/link';

export default function AdminSidebar() {
  const [settings, setSettings] = useState({
    visible: true,
    position: 'right',
    width: 'normal',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    collapsible: true,
    defaultCollapsed: false,
    showIcons: true,
    showLabels: true,
    animatedTransitions: true
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Layout className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">القائمة الجانبية</h1>
                <p className="text-sm text-gray-600">التحكم في الشريط الجانبي</p>
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
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">الإعدادات الأساسية</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">الرؤية</h4>
                  <p className="text-sm text-gray-600">إظهار أو إخفاء القائمة الجانبية</p>
                </div>
                <button onClick={() => setSettings({...settings, visible: !settings.visible})} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.visible ? 'bg-green-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.visible ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الموضع</label>
                <select value={settings.position} onChange={(e) => setSettings({...settings, position: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="left">يسار</option>
                  <option value="right">يمين</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العرض</label>
                <select value={settings.width} onChange={(e) => setSettings({...settings, width: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="narrow">ضيق</option>
                  <option value="normal">عادي</option>
                  <option value="wide">عريض</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">التصميم</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">لون الخلفية</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={settings.backgroundColor} onChange={(e) => setSettings({...settings, backgroundColor: e.target.value})} className="w-12 h-12 rounded-lg cursor-pointer" />
                  <input type="text" value={settings.backgroundColor} onChange={(e) => setSettings({...settings, backgroundColor: e.target.value})} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">لون النص</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={settings.textColor} onChange={(e) => setSettings({...settings, textColor: e.target.value})} className="w-12 h-12 rounded-lg cursor-pointer" />
                  <input type="text" value={settings.textColor} onChange={(e) => setSettings({...settings, textColor: e.target.value})} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">الميزات</h2>
            <div className="space-y-3">
              {[
                { key: 'collapsible', label: 'قابلة للطي' },
                { key: 'defaultCollapsed', label: 'مطوية افتراضياً' },
                { key: 'showIcons', label: 'عرض الأيقونات' },
                { key: 'showLabels', label: 'عرض النصوص' },
                { key: 'animatedTransitions', label: 'انتقالات متحركة' }
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between">
                  <p className="text-gray-900">{item.label}</p>
                  <button onClick={() => setSettings({...settings, [item.key]: !settings[item.key as keyof typeof settings]})} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings[item.key as keyof typeof settings] ? 'bg-green-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings[item.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
