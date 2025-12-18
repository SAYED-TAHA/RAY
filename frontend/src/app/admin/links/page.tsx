'use client';

import React, { useEffect, useState } from 'react';
import { LinkIcon, Plus, Edit, Trash2, Copy, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { fetchAdminSettings, updateAdminSettings } from '../../../services/adminSettingsService';

export default function AdminLinks() {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAdminSettings();
        setLinks(Array.isArray(data?.ui?.links) ? (data.ui!.links as any[]) : []);
      } catch (e: any) {
        console.error('Failed to load admin settings:', e);
        setError(e?.message || 'فشل تحميل الإعدادات');
        setLinks([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const saveLinks = async (next: any[]) => {
    try {
      setSaving(true);
      setError(null);
      await updateAdminSettings({ ui: { links: next } } as any);
    } catch (e: any) {
      console.error('Failed to update admin settings:', e);
      setError(e?.message || 'فشل حفظ الإعدادات');
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  const handleOpen = (url: string) => {
    try {
      const isAbsolute = /^https?:\/\//i.test(url);
      const target = isAbsolute ? url : `${window.location.origin}${url.startsWith('/') ? url : `/${url}`}`;
      window.open(target, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.error('Open failed:', e);
    }
  };

  const handleDelete = (id: number) => {
    const next = links.filter((l) => l?.id !== id);
    setLinks(next);
    saveLinks(next);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <LinkIcon className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الروابط</h1>
                <p className="text-sm text-gray-600">إدارة روابط الموقع</p>
              </div>
            </div>
            <button
              disabled={loading || saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            >
              <Plus className="w-4 h-4" />
              {saving ? 'جاري الحفظ...' : 'رابط جديد'}
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
        ) : links.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center text-gray-600">
            لا توجد روابط محفوظة حالياً.
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العنوان</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الرابط</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الفئة</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">النقرات</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {links.map((link: any) => (
                    <tr key={link?.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{link?.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{link?.url}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                          {link?.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          link?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {link?.status === 'active' ? 'نشط' : 'غير نشط'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{link?.clicks ?? 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button onClick={() => handleCopy(link?.url)} className="text-blue-600 hover:text-blue-900"><Copy className="w-4 h-4" /></button>
                          <button onClick={() => handleOpen(link?.url)} className="text-green-600 hover:text-green-900"><ExternalLink className="w-4 h-4" /></button>
                          <button className="text-gray-600 hover:text-gray-900"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(link?.id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
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
