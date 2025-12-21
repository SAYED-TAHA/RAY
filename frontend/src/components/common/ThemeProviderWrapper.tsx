"use client";

import React from 'react';
import { ThemeProvider } from './ThemeContext';

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

export const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
