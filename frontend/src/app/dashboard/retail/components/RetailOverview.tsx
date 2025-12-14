import React from 'react';
import { Store } from 'lucide-react';

const RetailOverview: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Store className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold">نظرة عامة</h2>
      </div>
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <p className="text-gray-500">نظرة عامة تحت التطوير</p>
      </div>
    </div>
  );
};

export default RetailOverview;
