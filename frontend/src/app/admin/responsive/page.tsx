'use client';

import React, { useEffect, useState } from 'react';
import { Smartphone, Tablet, Monitor, Eye, EyeOff, Save } from 'lucide-react';
import Link from 'next/link';
import { fetchAdminSettings, updateAdminSettings } from '../../../services/adminSettingsService';

export default function AdminResponsive() {
  const [settings, setSettings] = useState({
    mobileOptimized: true,
    tabletOptimized: true,
    desktopOptimized: true,
    mobileBreakpoint: 640,
    tabletBreakpoint: 1024,
    desktopBreakpoint: 1280
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAdminSettings();
        const responsive = data?.ui?.responsive;
        if (responsive) {
          setSettings((prev) => ({
            ...prev,
            ...responsive
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
          responsive: { ...settings }
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
                <Smartphone className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الاستجابة والتوافق</h1>
                <p className="text-sm text-gray-600">إعدادات العرض على الأجهزة المختلفة</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">{error}</div>
        )}

        {loading ? (
          <div className="text-gray-600">جاري تحميل الإعدادات...</div>
        ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-gray-900">الهاتف الذكي</h3>
              </div>
              <button onClick={() => setSettings({...settings, mobileOptimized: !settings.mobileOptimized})} className={`p-2 rounded-lg transition ${settings.mobileOptimized ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                {settings.mobileOptimized ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-sm text-gray-600">تحسين العرض على الهواتف الذكية</p>
            <p className="text-xs text-gray-500 mt-2">الحد الأدنى: {settings.mobileBreakpoint}px</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Tablet className="w-6 h-6 text-purple-600" />
                <h3 className="font-bold text-gray-900">الجهاز اللوحي</h3>
              </div>
              <button onClick={() => setSettings({...settings, tabletOptimized: !settings.tabletOptimized})} className={`p-2 rounded-lg transition ${settings.tabletOptimized ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                {settings.tabletOptimized ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-sm text-gray-600">تحسين العرض على الأجهزة اللوحية</p>
            <p className="text-xs text-gray-500 mt-2">الحد الأدنى: {settings.tabletBreakpoint}px</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Monitor className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-gray-900">سطح المكتب</h3>
              </div>
              <button onClick={() => setSettings({...settings, desktopOptimized: !settings.desktopOptimized})} className={`p-2 rounded-lg transition ${settings.desktopOptimized ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                {settings.desktopOptimized ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-sm text-gray-600">تحسين العرض على أجهزة سطح المكتب</p>
            <p className="text-xs text-gray-500 mt-2">الحد الأدنى: {settings.desktopBreakpoint}px</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6">نقاط الفصل (Breakpoints)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نقطة فصل الهاتف (px)</label>
              <input type="number" value={settings.mobileBreakpoint} onChange={(e) => setSettings({...settings, mobileBreakpoint: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نقطة فصل الجهاز اللوحي (px)</label>
              <input type="number" value={settings.tabletBreakpoint} onChange={(e) => setSettings({...settings, tabletBreakpoint: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نقطة فصل سطح المكتب (px)</label>
              <input type="number" value={settings.desktopBreakpoint} onChange={(e) => setSettings({...settings, desktopBreakpoint: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}
