"use client";

import { useContext } from 'react';
import { ThemeContext } from './theme-context';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('useTheme must be used within a ThemeProvider');
    }

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
