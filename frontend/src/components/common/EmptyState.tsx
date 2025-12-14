
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  color?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  color = "text-gray-400"
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in duration-300">
      <div className={`w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 ${color}`}>
        <Icon className="w-10 h-10 opacity-50" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm max-w-xs mb-6">{description}</p>
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-black transition shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
