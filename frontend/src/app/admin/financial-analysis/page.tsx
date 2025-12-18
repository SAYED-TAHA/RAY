'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, TrendingDown, BarChart3, Download, Loader } from 'lucide-react';
import Link from 'next/link';
import { fetchFinancialAnalysis } from '../../../services/adminFinanceService';

interface AnalysisData {
  revenue: number;
  expenses: number;
  profit: number;
  marginPercentage: number;
  growthRate: number;
  roi: number;
}

interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export default function AdminFinancialAnalysis() {
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchFinancialAnalysis();
        setAnalysis(data.analysis);
        setMonthlyData(data.monthlyData || []);
      } catch (error) {
        console.error('خطأ في جلب البيانات المالية:', error);
        setAnalysis(null);
        setMonthlyData([]);
        setError('فشل تحميل البيانات المالية');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Calculator className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">التحليل المالي</h1>
                <p className="text-sm text-gray-600">تقارير مالية مفصلة وتحليلات</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Download className="w-4 h-4" />
              تصدير التقرير
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">جاري تحميل البيانات...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 rounded-xl p-6 border border-red-200 text-red-700 text-center">
            {error}
            <div className="mt-4">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                إعادة المحاولة
              </button>
            </div>
          </div>
        ) : analysis ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">الإيرادات الكلية</p>
                    <p className="text-3xl font-bold text-gray-900">{(analysis.revenue/1000000).toFixed(2)}M</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">المصروفات الكلية</p>
                    <p className="text-3xl font-bold text-gray-900">{(analysis.expenses/1000000).toFixed(2)}M</p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-red-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">الربح الصافي</p>
                    <p className="text-3xl font-bold text-green-600">{(analysis.profit/1000000).toFixed(2)}M</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <p className="text-sm text-gray-600">هامش الربح</p>
                <p className="text-3xl font-bold text-gray-900">{analysis.marginPercentage}%</p>
                <p className="text-xs text-gray-600 mt-2">من الإيرادات</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <p className="text-sm text-gray-600">معدل النمو</p>
                <p className="text-3xl font-bold text-green-600">+{analysis.growthRate}%</p>
                <p className="text-xs text-gray-600 mt-2">مقارنة بالشهر السابق</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <p className="text-sm text-gray-600">العائد على الاستثمار</p>
                <p className="text-3xl font-bold text-blue-600">{analysis.roi}%</p>
                <p className="text-xs text-gray-600 mt-2">ROI</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-6">البيانات الشهرية</h2>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">{data.month}</h3>
                      <span className="text-sm font-bold text-green-600">{(data.profit/1000000).toFixed(2)}M ج.م</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">الإيرادات</p>
                        <p className="font-medium text-gray-900">{(data.revenue/1000000).toFixed(2)}M</p>
                      </div>
                      <div>
                        <p className="text-gray-600">المصروفات</p>
                        <p className="font-medium text-gray-900">{(data.expenses/1000000).toFixed(2)}M</p>
                      </div>
                      <div>
                        <p className="text-gray-600">الهامش</p>
                        <p className="font-medium text-green-600">{(data.revenue > 0 ? ((data.profit / data.revenue) * 100) : 0).toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600">لم يتم تحميل البيانات</p>
          </div>
        )}
      </div>
    </div>
  );
}
