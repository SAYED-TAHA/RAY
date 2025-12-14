import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  color?: string;
  onClick?: () => void;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, label, color = "bg-white text-gray-700 border border-gray-200", onClick, className = "" }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl shadow-sm transition hover:shadow-md hover:-translate-y-1 ${color} ${className}`}
  >
    <Icon className="w-6 h-6" />
    <span className="text-xs font-bold">{label}</span>
  </button>
);

export default ActionButton;
