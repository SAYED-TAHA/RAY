'use client';

import React, { useEffect, useState } from 'react';
import { Handshake, Plus } from 'lucide-react';
import Link from 'next/link';
import { fetchJobs } from '../../../services/jobsService';

export default function AdminHiring() {
  const [openJobs, setOpenJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const jobs = await fetchJobs();
      setOpenJobs(Array.isArray(jobs) ? jobs.length : 0);
    } catch (e: any) {
      console.error('Failed to load hiring stats:', e);
      setError(e?.message || 'فشل تحميل بيانات التوظيف');
      setOpenJobs(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Handshake className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">عملية التوظيف</h1>
                <p className="text-sm text-gray-600">إدارة عمليات التوظيف والمرشحين</p>
              </div>
            </div>
            <button disabled className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-60 cursor-not-allowed">
              <Plus className="w-4 h-4" />
              وظيفة جديدة
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">الوظائف المفتوحة</p>
            <p className="text-2xl font-bold text-gray-900">{loading ? '-' : openJobs}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">إجمالي المرشحين</p>
            <p className="text-2xl font-bold text-blue-600">N/A</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">في المقابلات</p>
            <p className="text-2xl font-bold text-orange-600">N/A</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">عروض معلقة</p>
            <p className="text-2xl font-bold text-green-600">N/A</p>
          </div>
        </div>

        {error ? (
          <div className="bg-red-50 rounded-xl p-6 border border-red-200 text-red-700 text-center">
            {error}
            <button onClick={load} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              إعادة المحاولة
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center text-gray-600">
            لا توجد عمليات توظيف حالياً
          </div>
        )}
      </div>
    </div>
  );
}
