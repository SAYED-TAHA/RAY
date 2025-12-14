import React from 'react';
import { LucideIcon } from 'lucide-react';
import SystemLink from './SystemLink';

interface System {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SectorPanelProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  systems: System[];
  onSystemSelect: (id: string) => void;
}

const SectorPanel: React.FC<SectorPanelProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  systems, 
  onSystemSelect 
}) => {
  
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200',
    cyan: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border-cyan-200',
    teal: 'bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200',
    green: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200',
  };

  // Extract background and text color for the icon container
  const colorClasses = colors[color] || colors.blue;
  // Simple parsing to get background and text classes for the icon container
  // Assuming the format 'bg-X text-Y ...'
  const parts = colorClasses.split(' ');
  const iconBgClass = parts.find(c => c.startsWith('bg-')) || 'bg-gray-100';
  const iconTextClass = parts.find(c => c.startsWith('text-')) || 'text-gray-600';

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
       <div className="flex items-start gap-4 mb-6">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconBgClass} ${iconTextClass}`}>
            <Icon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-gray-500 text-sm mt-1">{description}</p>
          </div>
       </div>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {systems.map((system) => (
            <SystemLink 
              key={system.id}
              href={`#${system.id}`}
              title={system.label}
              description={system.label}
              icon={system.icon}
            />
          ))}
       </div>
    </div>
  );
};

export default SectorPanel;
