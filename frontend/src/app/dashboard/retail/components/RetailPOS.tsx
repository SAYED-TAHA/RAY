import React from 'react';
import { ShoppingCart } from 'lucide-react';

const RetailPOS: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold">نقطة البيع</h2>
      </div>
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <p className="text-gray-500">نقطة بيع تحت التطوير</p>
      </div>
    </div>
  );
};

export default RetailPOS;
