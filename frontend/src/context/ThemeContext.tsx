import React, { createContext, useContext, ReactNode } from 'react';
import { useTheme } from '@/hooks/useTheme';

interface ThemeContextType {
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
  toggleTheme: () => void;
  toggleLanguage: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'ar' | 'en') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

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
