'use client';

import React, { useEffect, useState } from 'react';
import { Palette, Save, RefreshCw, Eye, Upload } from 'lucide-react';
import Link from 'next/link';
import { fetchAdminSettings, updateAdminSettings } from '../../../services/adminSettingsService';

export default function AdminAppearance() {
  const [settings, setSettings] = useState({
    siteName: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    accentColor: '#F59E0B',
    theme: 'light',
    layout: 'default',
    headerVisible: true,
    footerVisible: true,
    sidebarVisible: true
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
        siteName: data?.general?.siteName ?? prev.siteName,
        primaryColor: data?.ui?.colors?.primaryColor ?? prev.primaryColor,
        secondaryColor: data?.ui?.colors?.secondaryColor ?? prev.secondaryColor,
        accentColor: data?.ui?.colors?.accentColor ?? prev.accentColor,
        theme: data?.ui?.theme ?? prev.theme,
        layout: data?.ui?.layout ?? prev.layout,
        headerVisible: data?.ui?.visibility?.headerVisible ?? prev.headerVisible,
        footerVisible: data?.ui?.visibility?.footerVisible ?? prev.footerVisible,
        sidebarVisible: data?.ui?.visibility?.sidebarVisible ?? prev.sidebarVisible
      }));
    } catch (e) {
      console.error('Failed to load appearance settings:', e);
      setError('فشل تحميل إعدادات المظهر');
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
        general: {
          siteName: settings.siteName
        },
        ui: {
          theme: settings.theme,
          layout: settings.layout,
          colors: {
            primaryColor: settings.primaryColor,
            secondaryColor: settings.secondaryColor,
            accentColor: settings.accentColor
          },
          visibility: {
            headerVisible: settings.headerVisible,
            footerVisible: settings.footerVisible,
            sidebarVisible: settings.sidebarVisible
          }
        }
      } as any);
    } catch (e: any) {
      console.error('Failed to save appearance settings:', e);
      setError(e?.message || 'فشل حفظ إعدادات المظهر');
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
                  <Palette className="w-6 h-6 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">المظهر والتصميم</h1>
                  <p className="text-sm text-gray-600">تخصيص مظهر الموقع</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  <Palette className="w-6 h-6 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">المظهر والتصميم</h1>
                  <p className="text-sm text-gray-600">تخصيص مظهر الموقع</p>
                </div>
              </div>
              <button onClick={load} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                إعادة المحاولة
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <Palette className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">المظهر والتصميم</h1>
                <p className="text-sm text-gray-600">تخصيص مظهر الموقع</p>
              </div>
            </div>
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition">
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-6">معلومات الموقع</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم الموقع</label>
                  <input type="text" value={settings.siteName} onChange={(e) => setSettings({...settings, siteName: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-6">الألوان</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اللون الأساسي</label>
                  <div className="flex items-center gap-3">
                    <input type="color" value={settings.primaryColor} onChange={(e) => setSettings({...settings, primaryColor: e.target.value})} className="w-12 h-12 rounded-lg cursor-pointer" />
                    <input type="text" value={settings.primaryColor} onChange={(e) => setSettings({...settings, primaryColor: e.target.value})} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اللون الثانوي</label>
                  <div className="flex items-center gap-3">
                    <input type="color" value={settings.secondaryColor} onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})} className="w-12 h-12 rounded-lg cursor-pointer" />
                    <input type="text" value={settings.secondaryColor} onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">لون التركيز</label>
                  <div className="flex items-center gap-3">
                    <input type="color" value={settings.accentColor} onChange={(e) => setSettings({...settings, accentColor: e.target.value})} className="w-12 h-12 rounded-lg cursor-pointer" />
                    <input type="text" value={settings.accentColor} onChange={(e) => setSettings({...settings, accentColor: e.target.value})} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-6">الإعدادات</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">المظهر</h4>
                    <p className="text-sm text-gray-600">اختر بين المظهر الفاتح والغامق</p>
                  </div>
                  <select value={settings.theme} onChange={(e) => setSettings({...settings, theme: e.target.value})} className="px-4 py-2 border border-gray-300 rounded-lg">
                    <option value="light">فاتح</option>
                    <option value="dark">غامق</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">التخطيط</h4>
                    <p className="text-sm text-gray-600">اختر تخطيط الموقع</p>
                  </div>
                  <select value={settings.layout} onChange={(e) => setSettings({...settings, layout: e.target.value})} className="px-4 py-2 border border-gray-300 rounded-lg">
                    <option value="default">افتراضي</option>
                    <option value="compact">مضغوط</option>
                    <option value="wide">عريض</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">رأس الصفحة</h4>
                    <p className="text-sm text-gray-600">إظهار أو إخفاء رأس الصفحة</p>
                  </div>
                  <button onClick={() => setSettings({...settings, headerVisible: !settings.headerVisible})} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.headerVisible ? 'bg-blue-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.headerVisible ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">تذييل الصفحة</h4>
                    <p className="text-sm text-gray-600">إظهار أو إخفاء تذييل الصفحة</p>
                  </div>
                  <button onClick={() => setSettings({...settings, footerVisible: !settings.footerVisible})} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.footerVisible ? 'bg-blue-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.footerVisible ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 h-fit">
            <h2 className="text-lg font-bold text-gray-900 mb-4">معاينة</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: settings.primaryColor }}>
                <p className="text-white font-medium">اللون الأساسي</p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: settings.secondaryColor }}>
                <p className="text-white font-medium">اللون الثانوي</p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: settings.accentColor }}>
                <p className="text-white font-medium">لون التركيز</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-900 font-medium">المظهر: {settings.theme === 'light' ? 'فاتح' : 'غامق'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
