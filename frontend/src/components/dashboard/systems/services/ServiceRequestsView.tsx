import React from 'react';
import { ClipboardList } from 'lucide-react';

const ServiceRequestsView: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <ClipboardList className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold">طلبات الخدمة</h2>
      </div>
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <p className="text-gray-500">طلبات الخدمة تحت التطوير</p>
      </div>
    </div>
  );
};

export default ServiceRequestsView;
