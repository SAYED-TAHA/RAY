'use client';

import React, { useEffect, useState } from 'react';
import { Settings, Save } from 'lucide-react';
import Link from 'next/link';
import { fetchAdminSettings, updateAdminSettings } from '../../../services/adminSettingsService';

export default function AdminAppName() {
  const [appName, setAppName] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const settings = await fetchAdminSettings();
        setAppName(settings?.general?.siteName || '');
        setAppDescription(settings?.advanced?.siteDescription || '');
      } catch (e: any) {
        console.error('Failed to load admin settings:', e);
        setError(e?.message || 'فشل تحميل الإعدادات');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      await updateAdminSettings({
        general: { siteName: appName } as any,
        advanced: { siteDescription: appDescription } as any
      } as any);
    } catch (e: any) {
      console.error('Failed to update admin settings:', e);
      setError(e?.message || 'فشل حفظ الإعدادات');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Settings className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">اسم التطبيق</h1>
                <p className="text-sm text-gray-600">تغيير اسم وهوية التطبيق</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={loading || saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">{error}</div>
          )}

          {loading ? (
            <div className="text-gray-600">جاري تحميل الإعدادات...</div>
          ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم التطبيق</label>
              <input type="text" value={appName} onChange={(e) => setAppName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              <p className="text-xs text-gray-500 mt-2">سيظهر هذا الاسم في رأس الصفحة والعلامات</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">وصف التطبيق</label>
              <textarea value={appDescription} onChange={(e) => setAppDescription(e.target.value)} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              <p className="text-xs text-gray-500 mt-2">سيظهر هذا الوصف في محركات البحث ووسائل التواصل</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">معاينة</h3>
              <div className="bg-white rounded p-3 border border-blue-100">
                <p className="font-bold text-gray-900">{appName}</p>
                <p className="text-sm text-gray-600">{appDescription}</p>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
