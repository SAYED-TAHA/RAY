
"use client";

import React from 'react';
import Link from 'next/link';
import { Home, AlertTriangle, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 dir-rtl font-sans">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center max-w-lg w-full border border-gray-100 animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-12 h-12 text-orange-500" />
        </div>
        
        <h1 className="text-4xl font-black text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">الصفحة غير موجودة</h2>
        
        <p className="text-gray-500 mb-8 leading-relaxed">
          عذراً، الصفحة التي تبحث عنها قد تكون حذفت، تغير اسمها، أو غير متاحة مؤقتاً.
        </p>

        <div className="flex flex-col gap-3">
          <Link 
            href="/" 
            className="w-full bg-ray-blue text-white py-3.5 rounded-xl font-bold hover:bg-blue-800 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
          >
            <Home className="w-5 h-5" />
            العودة للرئيسية
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full bg-gray-100 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            الرجوع للصفحة السابقة
          </button>
        </div>
      </div>
    </div>
  );
}
