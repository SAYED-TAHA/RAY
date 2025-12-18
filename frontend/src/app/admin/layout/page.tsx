'use client';

import React, { useEffect, useState } from 'react';
import { Monitor, Save } from 'lucide-react';
import Link from 'next/link';
import { fetchAdminSettings, updateAdminSettings } from '../../../services/adminSettingsService';

export default function AdminLayout() {
  const [layout, setLayout] = useState('default');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data: any = await fetchAdminSettings();
      setLayout(data?.ui?.layout || 'default');
    } catch (e) {
      console.error('Failed to load layout settings:', e);
      setError('فشل تحميل إعدادات التخطيط');
      setLayout('default');
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
          layout
        }
      } as any);
    } catch (e: any) {
      console.error('Failed to save layout settings:', e);
      setError(e?.message || 'فشل حفظ إعدادات التخطيط');
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
                  <Monitor className="w-6 h-6 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">التخطيط</h1>
                  <p className="text-sm text-gray-600">اختر تخطيط الموقع</p>
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
                  <Monitor className="w-6 h-6 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">التخطيط</h1>
                  <p className="text-sm text-gray-600">اختر تخطيط الموقع</p>
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
                <Monitor className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">التخطيط</h1>
                <p className="text-sm text-gray-600">اختر تخطيط الموقع</p>
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
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6">اختر التخطيط</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button onClick={() => setLayout('default')} className={`p-6 rounded-lg border-2 transition ${layout === 'default' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              <div className="bg-gray-100 rounded p-4 mb-3 h-24 flex flex-col gap-2">
                <div className="h-2 bg-gray-300 rounded"></div>
                <div className="flex gap-2 flex-1">
                  <div className="w-1/4 bg-gray-300 rounded"></div>
                  <div className="flex-1 bg-gray-300 rounded"></div>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">الافتراضي</h3>
              <p className="text-sm text-gray-600">تخطيط قياسي مع شريط جانبي</p>
            </button>

            <button onClick={() => setLayout('compact')} className={`p-6 rounded-lg border-2 transition ${layout === 'compact' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              <div className="bg-gray-100 rounded p-4 mb-3 h-24 flex flex-col gap-1">
                <div className="h-1 bg-gray-300 rounded"></div>
                <div className="flex gap-1 flex-1">
                  <div className="w-1/6 bg-gray-300 rounded"></div>
                  <div className="flex-1 bg-gray-300 rounded"></div>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">مضغوط</h3>
              <p className="text-sm text-gray-600">تخطيط مضغوط وفعال</p>
            </button>

            <button onClick={() => setLayout('wide')} className={`p-6 rounded-lg border-2 transition ${layout === 'wide' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              <div className="bg-gray-100 rounded p-4 mb-3 h-24 flex flex-col gap-2">
                <div className="h-2 bg-gray-300 rounded"></div>
                <div className="flex gap-2 flex-1">
                  <div className="flex-1 bg-gray-300 rounded"></div>
                  <div className="flex-1 bg-gray-300 rounded"></div>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">عريض</h3>
              <p className="text-sm text-gray-600">تخطيط عريض بدون شريط جانبي</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
