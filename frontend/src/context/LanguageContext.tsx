"use client";

import React, { useState, useEffect } from 'react';

import { Language, LanguageContext } from './language-context';

const translations = {
  ar: {
    welcome: 'أهلاً بك',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    dashboard: 'لوحة التحكم',
    categories: 'الأقسام',
    search: 'بحث',
    cart: 'السلة',
    profile: 'الملف الشخصي'
  },
  en: {
    welcome: 'Welcome',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    dashboard: 'Dashboard',
    categories: 'Categories',
    search: 'Search',
    cart: 'Cart',
    profile: 'Profile'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang && (storedLang === 'ar' || storedLang === 'en')) {
      setLanguage(storedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ar] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
