import React from 'react';
import { HelpCircle } from 'lucide-react';

interface HelpViewProps {
  onNavigate?: (view: string) => void;
}

const HelpView: React.FC<HelpViewProps> = ({ onNavigate }) => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold">مركز المساعدة</h2>
      </div>
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <p className="text-gray-500">مركز المساعدة تحت التطوير</p>
      </div>
    </div>
  );
};

export default HelpView;
