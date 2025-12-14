import React from 'react';
import { ExternalLink } from 'lucide-react';

interface SystemLinkProps {
  href: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const SystemLink: React.FC<SystemLinkProps> = ({ href, title, description, icon: Icon }) => {
  return (
    <a 
      href={href}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition group"
    >
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition" />
    </a>
  );
};

export default SystemLink;
