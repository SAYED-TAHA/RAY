"use client";

import { useContext } from 'react';
import { ThemeContext } from '@/components/common/theme-context';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'light' as const,
      language: 'ar' as const,
      toggleTheme: () => {},
      toggleLanguage: () => {},
      setTheme: () => {},
      setLanguage: () => {}
    };
  }

  return context;
};
