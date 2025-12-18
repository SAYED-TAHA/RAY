'use client';

import React, { useEffect, useState } from 'react';
import { Palette, Save } from 'lucide-react';
import Link from 'next/link';
import { fetchAdminSettings, updateAdminSettings } from '../../../services/adminSettingsService';

export default function AdminColors() {
  const [colors, setColors] = useState({
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
    danger: '#EF4444',
    warning: '#F97316',
    success: '#22C55E',
    info: '#06B6D4',
    light: '#F3F4F6',
    dark: '#1F2937'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const settings = await fetchAdminSettings();
        const palette = settings?.ui?.palette;
        if (palette) {
          setColors((prev) => ({
            ...prev,
            ...palette
          }));
        }
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
        ui: {
          palette: { ...colors }
        }
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
                <Palette className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الألوان والتصميم</h1>
                <p className="text-sm text-gray-600">تخصيص ألوان الموقع</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={loading || saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {saving ? 'جاري الحفظ...' : 'حفظ'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">{error}</div>
          )}

          {loading ? (
            <div className="text-gray-600">جاري تحميل الإعدادات...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(colors).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{key}</label>
                  <div className="flex items-center gap-3">
                    <input type="color" value={value} onChange={(e) => setColors({ ...colors, [key]: e.target.value })} className="w-12 h-12 rounded-lg cursor-pointer" />
                    <input type="text" value={value} onChange={(e) => setColors({ ...colors, [key]: e.target.value })} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  </div>
                  <div className="mt-2 p-3 rounded-lg" style={{ backgroundColor: value }}>
                    <p className="text-xs text-gray-600">معاينة</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
