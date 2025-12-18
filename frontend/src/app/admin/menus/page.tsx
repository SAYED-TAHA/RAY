'use client';

import React, { useEffect, useState } from 'react';
import { Menu, Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { fetchAdminSettings, updateAdminSettings } from '../../../services/adminSettingsService';

export default function AdminMenus() {
  const [menus, setMenus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAdminSettings();
        setMenus(Array.isArray(data?.ui?.menus) ? (data.ui!.menus as any[]) : []);
      } catch (e: any) {
        console.error('Failed to load admin settings:', e);
        setError(e?.message || 'فشل تحميل الإعدادات');
        setMenus([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const saveMenus = async (next: any[]) => {
    try {
      setSaving(true);
      setError(null);
      await updateAdminSettings({ ui: { menus: next } } as any);
    } catch (e: any) {
      console.error('Failed to update admin settings:', e);
      setError(e?.message || 'فشل حفظ الإعدادات');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: number) => {
    const next = menus.filter((m) => m?.id !== id);
    setMenus(next);
    saveMenus(next);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Menu className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">القوائم</h1>
                <p className="text-sm text-gray-600">إدارة قوائم الموقع</p>
              </div>
            </div>
            <button
              disabled={loading || saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            >
              <Plus className="w-4 h-4" />
              {saving ? 'جاري الحفظ...' : 'قائمة جديدة'}
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
        ) : menus.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center text-gray-600">
            لا توجد قوائم محفوظة حالياً.
          </div>
        ) : (
          <div className="space-y-4">
            {menus.map((menu: any) => (
              <div key={menu?.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{menu?.name}</h3>
                    <p className="text-sm text-gray-600">{menu?.items ?? 0} عنصر - {menu?.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      <Eye className="w-4 h-4" />
                      معاينة
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                      <Edit className="w-4 h-4" />
                      تعديل
                    </button>
                    <button onClick={() => handleDelete(menu?.id)} className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition">
                      <Trash2 className="w-4 h-4" />
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
