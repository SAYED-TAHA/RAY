"use client";

import { createContext } from 'react';

export interface ThemeContextType {
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
  toggleTheme: () => void;
  toggleLanguage: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'ar' | 'en') => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
