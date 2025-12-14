'use client';

import React, { useState } from 'react';
import { Settings2, Save, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function AdminFullControl() {
  const [settings, setSettings] = useState({
    siteName: 'راي للتقنية',
    siteDescription: 'منصة متكاملة للخدمات الرقمية',
    maintenanceMode: false,
    debugMode: false,
    cacheEnabled: true,
    apiEnabled: true,
    analyticsEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    backupEnabled: true,
    backupFrequency: 'daily',
    maxUploadSize: 50,
    sessionTimeout: 30,
    passwordMinLength: 8,
    twoFactorAuth: true
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Settings2 className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">التحكم الشامل</h1>
                <p className="text-sm text-gray-600">إعدادات النظام المتقدمة</p>
              </div>
            </div>
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition">
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">معلومات الموقع</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم الموقع</label>
                <input type="text" value={settings.siteName} onChange={(e) => setSettings({...settings, siteName: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">وصف الموقع</label>
                <textarea value={settings.siteDescription} onChange={(e) => setSettings({...settings, siteDescription: e.target.value})} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">وضع الصيانة والتصحيح</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">وضع الصيانة</h4>
                  <p className="text-sm text-gray-600">إيقاف الموقع مؤقتاً للصيانة</p>
                </div>
                <button onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.maintenanceMode ? 'bg-red-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">وضع التصحيح</h4>
                  <p className="text-sm text-gray-600">تفعيل رسائل الخطأ التفصيلية</p>
                </div>
                <button onClick={() => setSettings({...settings, debugMode: !settings.debugMode})} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.debugMode ? 'bg-blue-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.debugMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">الميزات والخدمات</h2>
            <div className="space-y-3">
              {[
                { key: 'cacheEnabled', label: 'تفعيل التخزين المؤقت' },
                { key: 'apiEnabled', label: 'تفعيل واجهة برمجية' },
                { key: 'analyticsEnabled', label: 'تفعيل التحليلات' },
                { key: 'emailNotifications', label: 'إشعارات البريد الإلكتروني' },
                { key: 'smsNotifications', label: 'إشعارات الرسائل النصية' },
                { key: 'pushNotifications', label: 'إشعارات الدفع' },
                { key: 'backupEnabled', label: 'تفعيل النسخ الاحتياطية' },
                { key: 'twoFactorAuth', label: 'المصادقة الثنائية' }
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

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">الإعدادات الأمنية والنسخ الاحتياطية</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تكرار النسخ الاحتياطية</label>
                <select value={settings.backupFrequency} onChange={(e) => setSettings({...settings, backupFrequency: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="hourly">كل ساعة</option>
                  <option value="daily">يومي</option>
                  <option value="weekly">أسبوعي</option>
                  <option value="monthly">شهري</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأقصى لحجم الملف (MB)</label>
                <input type="number" value={settings.maxUploadSize} onChange={(e) => setSettings({...settings, maxUploadSize: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">انتهاء الجلسة (دقيقة)</label>
                <input type="number" value={settings.sessionTimeout} onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأدنى لطول كلمة المرور</label>
                <input type="number" value={settings.passwordMinLength} onChange={(e) => setSettings({...settings, passwordMinLength: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
