'use client';

import React, { useEffect, useState } from 'react';
import { Eye, Smartphone, Tablet, Monitor, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { fetchAdminSettings } from '../../../services/adminSettingsService';

export default function AdminPreview() {
  const [device, setDevice] = useState('desktop');
  const [refreshing, setRefreshing] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [siteUrl, setSiteUrl] = useState<string>('/');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const settings = await fetchAdminSettings();
      const url = settings?.general?.siteUrl;
      setSiteUrl(url && typeof url === 'string' && url.trim() ? url.trim() : '/');
    } catch (e) {
      console.error('Failed to load admin settings for preview:', e);
      setSiteUrl('/');
      setError('فشل تحميل إعدادات المعاينة');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    setIframeKey((k) => k + 1);
  };

  const getDeviceWidth = () => {
    switch(device) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-2xl';
      default: return 'w-full';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Eye className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">معاينة التغييرات</h1>
                <p className="text-sm text-gray-600">معاينة الموقع على أجهزة مختلفة</p>
              </div>
            </div>
            <button onClick={handleRefresh} disabled={refreshing} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition">
              {refreshing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              {refreshing ? 'جاري التحديث...' : 'تحديث'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex gap-3">
            <button onClick={() => setDevice('mobile')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${device === 'mobile' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              <Smartphone className="w-4 h-4" />
              الهاتف
            </button>
            <button onClick={() => setDevice('tablet')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${device === 'tablet' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              <Tablet className="w-4 h-4" />
              الجهاز اللوحي
            </button>
            <button onClick={() => setDevice('desktop')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${device === 'desktop' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              <Monitor className="w-4 h-4" />
              سطح المكتب
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className={`${getDeviceWidth()} bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden`}>
            {error && (
              <div className="p-4 bg-red-50 border-b border-red-200 text-red-700 text-center">
                {error}
                <button onClick={load} className="ml-3 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">إعادة المحاولة</button>
              </div>
            )}
            {loading ? (
              <div className="p-10 text-center text-gray-600">جاري تحميل إعدادات المعاينة...</div>
            ) : (
              <iframe
                key={iframeKey}
                src={siteUrl}
                className="w-full h-[75vh]"
                onLoad={() => setRefreshing(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
