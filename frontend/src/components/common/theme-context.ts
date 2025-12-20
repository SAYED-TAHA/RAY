"use client";

import { createContext } from 'react';

type Theme = 'light' | 'dark';
type Language = 'ar' | 'en';

export interface ThemeContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
