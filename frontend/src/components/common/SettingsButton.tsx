'use client';

import React from 'react';
import { Settings } from 'lucide-react';
import Link from 'next/link';

interface SettingsButtonProps {
  variant?: 'icon' | 'button' | 'floating';
  className?: string;
}

export default function SettingsButton({ variant = 'button', className = '' }: SettingsButtonProps) {
  if (variant === 'icon') {
    return (
      <Link href="/settings" className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition ${className}`}>
        <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </Link>
    );
  }

  if (variant === 'floating') {
    return (
      <Link
        href="/settings"
        className={`fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-110 z-40 ${className}`}
      >
        <Settings className="w-6 h-6" />
      </Link>
    );
  }

  return (
    <Link
      href="/settings"
      className={`flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition ${className}`}
    >
      <Settings className="w-4 h-4" />
      الإعدادات
    </Link>
  );
}
