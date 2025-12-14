"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface MerchantData {
  id?: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  city: string;
  businessType: string;
  isLoggedIn: boolean;
}

interface MerchantContextType {
  merchant: MerchantData | null;
  register: (data: Omit<MerchantData, 'id' | 'isLoggedIn'>) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateMerchant: (data: Partial<MerchantData>) => void;
}

const MerchantContext = createContext<MerchantContextType | undefined>(undefined);

export const MerchantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [merchant, setMerchant] = useState<MerchantData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // تحميل بيانات التاجر من localStorage عند بدء التطبيق
  useEffect(() => {
    const savedMerchant = localStorage.getItem('merchantData');
    if (savedMerchant) {
      try {
        setMerchant(JSON.parse(savedMerchant));
      } catch (error) {
        console.error('خطأ في تحميل بيانات التاجر:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const register = (data: Omit<MerchantData, 'id' | 'isLoggedIn'>) => {
    const newMerchant: MerchantData = {
      id: Date.now().toString(),
      ...data,
      isLoggedIn: true
    };
    setMerchant(newMerchant);
    localStorage.setItem('merchantData', JSON.stringify(newMerchant));
    // يمكن إرسال البيانات للخادم هنا
    console.log('تم تسجيل التاجر:', newMerchant);
  };

  const login = (email: string, password: string): boolean => {
    // هنا يتم التحقق من البيانات مع الخادم
    // للآن سنفترض أن الدخول ناجح
    const merchantData: MerchantData = {
      id: Date.now().toString(),
      businessName: 'نشاطي التجاري',
      ownerName: 'المالك',
      email,
      phone: '',
      city: '',
      businessType: 'clinic',
      isLoggedIn: true
    };
    setMerchant(merchantData);
    localStorage.setItem('merchantData', JSON.stringify(merchantData));
    return true;
  };

  const logout = () => {
    setMerchant(null);
    localStorage.removeItem('merchantData');
  };

  const updateMerchant = (data: Partial<MerchantData>) => {
    if (merchant) {
      const updated = { ...merchant, ...data };
      setMerchant(updated);
      localStorage.setItem('merchantData', JSON.stringify(updated));
    }
  };

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <MerchantContext.Provider value={{ merchant, register, login, logout, updateMerchant }}>
      {children}
    </MerchantContext.Provider>
  );
};

export const useMerchant = () => {
  const context = useContext(MerchantContext);
  if (!context) {
    throw new Error('useMerchant يجب أن يكون داخل MerchantProvider');
  }
  return context;
};
