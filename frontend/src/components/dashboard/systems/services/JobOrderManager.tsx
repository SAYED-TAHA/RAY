import React from 'react';
import { FileText } from 'lucide-react';

const JobOrderManager: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-orange-600" />
        <h2 className="text-2xl font-bold">إدارة أوامر العمل</h2>
      </div>
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <p className="text-gray-500">إدارة أوامر العمل تحت التطوير</p>
      </div>
    </div>
  );
};

export default JobOrderManager;
