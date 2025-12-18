'use client';

import React, { useState, useEffect } from 'react';
import { TrendingDown, DollarSign, Download, Loader } from 'lucide-react';
import Link from 'next/link';
import { fetchExpenses, ExpenseCategory } from '../../../services/adminFinanceService';

export default function AdminExpenses() {
  const [expensesData, setExpensesData] = useState<ExpenseCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchExpenses();
        setExpensesData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('خطأ في جلب بيانات المصروفات:', error);
        setExpensesData([]);
        setError('فشل تحميل بيانات المصروفات');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const totalExpenses = expensesData.reduce((sum, item) => sum + (item.amount || 0), 0);
  const avgDailyExpenses = totalExpenses / 30;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <TrendingDown className="w-6 h-6 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">المصروفات</h1>
                  <p className="text-sm text-gray-600">إدارة وتحليل المصروفات</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3">
              <Loader className="w-6 h-6 animate-spin text-blue-600" />
              <span className="text-gray-600">جاري تحميل المصروفات...</span>
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
                  <TrendingDown className="w-6 h-6 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">المصروفات</h1>
                  <p className="text-sm text-gray-600">إدارة وتحليل المصروفات</p>
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
                <TrendingDown className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">المصروفات</h1>
                <p className="text-sm text-gray-600">إدارة وتحليل المصروفات</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">إجمالي المصروفات</p>
            <p className="text-3xl font-bold text-gray-900">{totalExpenses.toLocaleString()} ج.م</p>
            <p className="text-sm text-gray-600 mt-2">حسب البيانات المتاحة</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">متوسط المصروفات اليومية</p>
            <p className="text-3xl font-bold text-gray-900">{Math.round(avgDailyExpenses).toLocaleString()} ج.م</p>
            <p className="text-sm text-gray-600 mt-2">تقريبي</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">فئات المصروفات</h2>
          <div className="space-y-4">
            {expensesData.length === 0 ? (
              <div className="text-center py-12 text-gray-600">لا توجد بيانات مصروفات</div>
            ) : (
              <>
                {expensesData.map((item: ExpenseCategory, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.category}</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-bold text-gray-900">{item.amount.toLocaleString()} ج.م</p>
                      <p className={`text-sm ${item.trend > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                        {item.trend > 0 ? '↑' : '↓'} {Math.abs(item.trend)}%
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
