"use client";

import React, { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Language = 'ar' | 'en';

import { ThemeContext } from '@/components/common/theme-context';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check local storage or system preference on mount (client-side only)
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      const savedLanguage = localStorage.getItem('language') as Language;
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (savedTheme) {
        setTheme(savedTheme);
      } else if (systemPrefersDark) {
        setTheme('dark');
      }

      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
      localStorage.setItem('language', language);
    }
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <ThemeContext.Provider value={{ theme, language, toggleTheme, toggleLanguage, setTheme, setLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};
