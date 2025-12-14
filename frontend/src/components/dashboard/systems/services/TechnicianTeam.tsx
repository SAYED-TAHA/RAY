import React from 'react';
import { Users } from 'lucide-react';

const TechnicianTeam: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold">فريق الفنيين</h2>
      </div>
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <p className="text-gray-500">فريق الفنيين تحت التطوير</p>
      </div>
    </div>
  );
};

export default TechnicianTeam;
