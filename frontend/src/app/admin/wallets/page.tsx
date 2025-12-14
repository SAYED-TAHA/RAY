'use client';

import React, { useState } from 'react';
import { Wallet, Plus, Edit, Trash2, Send, Download } from 'lucide-react';
import Link from 'next/link';

export default function AdminWallets() {
  const wallets = [
    { id: 1, name: 'المحفظة الرئيسية', balance: 50000, currency: 'ج.م', status: 'active', transactions: 234, lastUpdate: '2025-12-05' },
    { id: 2, name: 'محفظة المبيعات', balance: 125000, currency: 'ج.م', status: 'active', transactions: 567, lastUpdate: '2025-12-05' },
    { id: 3, name: 'محفظة الأرباح', balance: 75000, currency: 'ج.م', status: 'active', transactions: 189, lastUpdate: '2025-12-04' },
    { id: 4, name: 'محفظة الاحتياطي', balance: 30000, currency: 'ج.م', status: 'inactive', transactions: 45, lastUpdate: '2025-12-01' },
    { id: 5, name: 'محفظة الموظفين', balance: 20000, currency: 'ج.م', status: 'active', transactions: 123, lastUpdate: '2025-12-05' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Wallet className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">المحافظ</h1>
                <p className="text-sm text-gray-600">إدارة المحافظ الرقمية</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
              محفظة جديدة
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">إجمالي الأرصدة</p>
            <p className="text-3xl font-bold text-gray-900">300,000 ج.م</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">عدد المحافظ</p>
            <p className="text-3xl font-bold text-gray-900">5</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">المحافظ النشطة</p>
            <p className="text-3xl font-bold text-green-600">4</p>
          </div>
        </div>

        <div className="space-y-4">
          {wallets.map(wallet => (
            <div key={wallet.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{wallet.name}</h3>
                  <p className="text-sm text-gray-600">{wallet.transactions} معاملة</p>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  wallet.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {wallet.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-gray-900">{wallet.balance.toLocaleString()} {wallet.currency}</p>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <Send className="w-4 h-4" />
                    تحويل
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
