'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ToggleRight, Plus, Edit, Eye, EyeOff, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { fetchAdminSettings, updateAdminSettings } from '../../../services/adminSettingsService';

export default function AdminButtons() {
  const [buttons, setButtons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const colorMap = useMemo(() => {
    return {
      blue: '#3B82F6',
      green: '#22C55E',
      purple: '#A855F7',
      orange: '#F97316',
      red: '#EF4444',
      yellow: '#EAB308',
      indigo: '#6366F1',
      cyan: '#06B6D4',
      gray: '#6B7280'
    } as Record<string, string>;
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAdminSettings();
        setButtons(Array.isArray(data?.ui?.buttons) ? (data.ui!.buttons as any[]) : []);
      } catch (e: any) {
        console.error('Failed to load admin settings:', e);
        setError(e?.message || 'فشل تحميل الإعدادات');
        setButtons([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const saveButtons = async (next: any[]) => {
    try {
      setSaving(true);
      setError(null);
      await updateAdminSettings({ ui: { buttons: next } } as any);
    } catch (e: any) {
      console.error('Failed to update admin settings:', e);
      setError(e?.message || 'فشل حفظ الإعدادات');
    } finally {
      setSaving(false);
    }
  };

  const toggleVisibility = (id: number) => {
    const next = buttons.map((btn) => (btn?.id === id ? { ...btn, visible: !btn.visible } : btn));
    setButtons(next);
    saveButtons(next);
  };

  const handleDelete = (id: number) => {
    const next = buttons.filter((btn) => btn?.id !== id);
    setButtons(next);
    saveButtons(next);
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
            <button
              disabled={loading || saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            >
              <Plus className="w-4 h-4" />
              {saving ? 'جاري الحفظ...' : 'زر جديد'}
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
        ) : buttons.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center text-gray-600">
            لا توجد أزرار محفوظة حالياً.
          </div>
        ) : (
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
                  {buttons.map((btn: any) => (
                    <tr key={btn?.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{btn?.label}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{btn?.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: colorMap[btn?.color] || btn?.color || colorMap.gray }}
                          />
                          <span className="text-sm text-gray-600">{btn?.color}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{btn?.action}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button onClick={() => toggleVisibility(btn?.id)} className={`p-2 rounded-lg transition ${btn?.visible ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                          {btn?.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-900"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(btn?.id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
