'use client';

import React from 'react';
import { UserCheck, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminCandidates() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <UserCheck className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">المتقدمون</h1>
                <p className="text-sm text-gray-600">إدارة المتقدمين للوظائف</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button disabled className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-60 cursor-not-allowed">
                <Plus className="w-4 h-4" />
                إضافة متقدم
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center text-gray-600">
          لا يوجد متقدمون حالياً. سيتم تفعيل إدارة المتقدمين عند توفر Backend لطلبات التوظيف.
        </div>
      </div>
    </div>
  );
}
