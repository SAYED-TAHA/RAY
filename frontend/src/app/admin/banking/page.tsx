'use client';

import React, { useState } from 'react';
import { Banknote, Plus, Edit, Trash2, Send, Download } from 'lucide-react';
import Link from 'next/link';

export default function AdminBanking() {
  const accounts = [
    { id: 1, bank: 'البنك الأهلي', accountNumber: '****1234', balance: 500000, currency: 'ج.م', status: 'active', accountType: 'جاري' },
    { id: 2, bank: 'بنك مصر', accountNumber: '****5678', balance: 250000, currency: 'ج.م', status: 'active', accountType: 'توفير' },
    { id: 3, bank: 'بنك الإسكندرية', accountNumber: '****9012', balance: 150000, currency: 'ج.م', status: 'inactive', accountType: 'جاري' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Banknote className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">البنوك والحسابات</h1>
                <p className="text-sm text-gray-600">إدارة الحسابات البنكية</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
              حساب جديد
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">إجمالي الأرصدة</p>
            <p className="text-3xl font-bold text-gray-900">900,000 ج.م</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">عدد الحسابات</p>
            <p className="text-3xl font-bold text-gray-900">3</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">الحسابات النشطة</p>
            <p className="text-3xl font-bold text-green-600">2</p>
          </div>
        </div>

        <div className="space-y-4">
          {accounts.map(account => (
            <div key={account.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{account.bank}</h3>
                  <p className="text-sm text-gray-600">{account.accountType} - {account.accountNumber}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  account.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {account.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-gray-900">{account.balance.toLocaleString()} {account.currency}</p>
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
