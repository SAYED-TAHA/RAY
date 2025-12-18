'use client';

import React, { useEffect, useState } from 'react';
import { Layout, Save } from 'lucide-react';
import Link from 'next/link';
import { fetchAdminSettings, updateAdminSettings } from '../../../services/adminSettingsService';

export default function AdminFooter() {
  const [settings, setSettings] = useState({
    visible: true,
    backgroundColor: '#1f2937',
    textColor: '#ffffff',
    columns: 4,
    showSocial: true,
    showNewsletter: true,
    showPaymentMethods: true,
    showCopyright: true,
    copyrightText: '© 2025 راي للتقنية. جميع الحقوق محفوظة.'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data: any = await fetchAdminSettings();
      setSettings((prev) => ({
        ...prev,
        visible: data?.ui?.footer?.visible ?? prev.visible,
        backgroundColor: data?.ui?.footer?.backgroundColor ?? prev.backgroundColor,
        textColor: data?.ui?.footer?.textColor ?? prev.textColor,
        columns: data?.ui?.footer?.columns ?? prev.columns,
        showSocial: data?.ui?.footer?.showSocial ?? prev.showSocial,
        showNewsletter: data?.ui?.footer?.showNewsletter ?? prev.showNewsletter,
        showPaymentMethods: data?.ui?.footer?.showPaymentMethods ?? prev.showPaymentMethods,
        showCopyright: data?.ui?.footer?.showCopyright ?? prev.showCopyright,
        copyrightText: data?.ui?.footer?.copyrightText ?? prev.copyrightText
      }));
    } catch (e) {
      console.error('Failed to load footer settings:', e);
      setError('فشل تحميل إعدادات الفوتر');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      await updateAdminSettings({
        ui: {
          footer: { ...settings },
          visibility: {
            footerVisible: settings.visible
          }
        }
      } as any);
    } catch (e: any) {
      console.error('Failed to save footer settings:', e);
      setError(e?.message || 'فشل حفظ إعدادات الفوتر');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
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
                  <h1 className="text-2xl font-bold text-gray-900">الفوتر</h1>
                  <p className="text-sm text-gray-600">التحكم في تذييل الصفحة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center text-gray-600">
            جاري تحميل الإعدادات...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
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
                  <h1 className="text-2xl font-bold text-gray-900">الفوتر</h1>
                  <p className="text-sm text-gray-600">التحكم في تذييل الصفحة</p>
                </div>
              </div>
              <button onClick={load} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                إعادة المحاولة
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 rounded-xl p-6 border border-red-200 text-red-700 text-center">
            {error}
          </div>
        </div>
      </div>
    );
  }

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
                <h1 className="text-2xl font-bold text-gray-900">الفوتر</h1>
                <p className="text-sm text-gray-600">التحكم في تذييل الصفحة</p>
              </div>
            </div>
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition">
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
                  <p className="text-sm text-gray-600">إظهار أو إخفاء الفوتر</p>
                </div>
                <button onClick={() => setSettings({...settings, visible: !settings.visible})} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.visible ? 'bg-green-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.visible ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عدد الأعمدة</label>
                <select value={settings.columns} onChange={(e) => setSettings({...settings, columns: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value={2}>عمودين</option>
                  <option value={3}>ثلاثة أعمدة</option>
                  <option value={4}>أربعة أعمدة</option>
                  <option value={5}>خمسة أعمدة</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">الميزات</h2>
            <div className="space-y-3">
              {[
                { key: 'showSocial', label: 'وسائل التواصل الاجتماعي' },
                { key: 'showNewsletter', label: 'الاشتراك في النشرة البريدية' },
                { key: 'showPaymentMethods', label: 'طرق الدفع' },
                { key: 'showCopyright', label: 'حقوق الملكية' }
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
            <h2 className="text-lg font-bold text-gray-900 mb-4">نص حقوق الملكية</h2>
            <textarea value={settings.copyrightText} onChange={(e) => setSettings({...settings, copyrightText: e.target.value})} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
