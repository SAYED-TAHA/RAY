'use client';

import React, { useState, useEffect } from 'react';
import { PiggyBank, TrendingUp, Download, BarChart3, Loader } from 'lucide-react';
import Link from 'next/link';
import { fetchProfit, ProfitRow } from '../../../services/adminFinanceService';

export default function AdminProfit() {
  const [profitData, setProfitData] = useState<ProfitRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchProfit();
        setProfitData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('خطأ في جلب بيانات الأرباح:', error);
        setProfitData([]);
        setError('فشل تحميل بيانات الأرباح');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const totalProfit = profitData.reduce((sum, r) => sum + (r.profit || 0), 0);
  const avgMargin = profitData.length > 0
    ? profitData.reduce((sum, r) => sum + (r.margin || 0), 0) / profitData.length
    : 0;
  const lastRow = profitData.length > 0 ? profitData[profitData.length - 1] : null;
  const prevRow = profitData.length > 1 ? profitData[profitData.length - 2] : null;
  const monthChangePct = lastRow && prevRow && prevRow.profit > 0
    ? ((lastRow.profit - prevRow.profit) / prevRow.profit) * 100
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <PiggyBank className="w-6 h-6 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">الأرباح</h1>
                  <p className="text-sm text-gray-600">تحليل الأرباح والهوامش</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3">
              <Loader className="w-6 h-6 animate-spin text-blue-600" />
              <span className="text-gray-600">جاري تحميل الأرباح...</span>
            </div>
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
                  <PiggyBank className="w-6 h-6 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">الأرباح</h1>
                  <p className="text-sm text-gray-600">تحليل الأرباح والهوامش</p>
                </div>
              </div>
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
                <PiggyBank className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الأرباح</h1>
                <p className="text-sm text-gray-600">تحليل الأرباح والهوامش</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Download className="w-4 h-4" />
              تصدير تقرير
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">إجمالي الأرباح</p>
            <p className="text-3xl font-bold text-green-600">{totalProfit.toLocaleString()} ج.م</p>
            <p className={`text-sm mt-2 ${monthChangePct !== null && monthChangePct >= 0 ? 'text-green-600' : 'text-gray-600'}`}>
              {monthChangePct === null ? 'حسب البيانات المتاحة' : `${monthChangePct >= 0 ? '↑' : '↓'} ${Math.abs(monthChangePct).toFixed(1)}% من الشهر السابق`}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">متوسط هامش الربح</p>
            <p className="text-3xl font-bold text-gray-900">{Math.round(avgMargin)}%</p>
            <p className="text-sm text-gray-600 mt-2">من الإيرادات</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">الربح هذا الشهر</p>
            <p className="text-3xl font-bold text-gray-900">{(lastRow?.profit || 0).toLocaleString()} ج.م</p>
            <p className="text-sm text-gray-600 mt-2">حتى الآن</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">تحليل الأرباح الشهري</h2>
          <div className="space-y-4">
            {profitData.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{item.month}</h3>
                  <span className="text-sm font-bold text-green-600">{item.profit.toLocaleString()} ج.م</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">الإيرادات</p>
                    <p className="font-medium text-gray-900">{item.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">المصروفات</p>
                    <p className="font-medium text-gray-900">{item.expenses.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">الهامش</p>
                    <p className="font-medium text-green-600">{item.margin}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
