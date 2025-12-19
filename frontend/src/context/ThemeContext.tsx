"use client";

import React, { ReactNode } from 'react';
import { useTheme } from '@/hooks/useTheme';

import { ThemeContext } from './theme-context';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeValues = useTheme();

  return (
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
};
