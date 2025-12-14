
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem('ray_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('ray_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('ray_theme', 'light');
      }
      return newMode;
    });
  };

  // Prevent hydration mismatch by waiting for mount to render specific theme-dependent UI if needed,
  // but here we provide the context immediately so the app tree structure is stable.
  // The 'isDarkMode' state will be accurate after the first effect.

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {/* We render children even if not mounted to allow SEO/Initial HTML, 
          but specific icons relying on isDarkMode might flicker slightly on first load without SSR support for theme. 
          Given this is a Client Component wrapper, it's acceptable. */}
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
