
import React from 'react';
import { ChevronLeft, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: { label: string; onClick?: () => void }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4 overflow-x-auto whitespace-nowrap pb-2">
      <div className="flex items-center gap-1">
        <Home className="w-4 h-4" />
        <span className="font-bold">الرئيسية</span>
      </div>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronLeft className="w-4 h-4 text-gray-300 rtl:rotate-180" />
          <button 
            onClick={item.onClick}
            disabled={!item.onClick}
            className={`hover:text-ray-blue transition ${!item.onClick ? 'font-bold text-gray-800 cursor-default' : 'cursor-pointer'}`}
          >
            {item.label}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
