
import React from 'react';
import { PageSkeleton } from '@/components/common/LoadingSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-ray-gold rounded-2xl flex items-center justify-center shadow-lg animate-bounce mx-auto mb-4">
            <span className="text-3xl font-black text-ray-black">R</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 font-bold text-sm animate-pulse justify-center">
            <div className="w-2 h-2 bg-ray-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-ray-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-ray-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            جاري التحميل...
          </div>
        </div>
      </div>
      
      {/* Show skeleton of page content */}
      <PageSkeleton />
    </div>
  );
}
