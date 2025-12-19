"use client";

import { createContext } from 'react';

export interface MerchantData {
  id?: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  city: string;
  businessType: string;
  isLoggedIn: boolean;
}

export interface MerchantContextType {
  merchant: MerchantData | null;
  register: (data: Omit<MerchantData, 'id' | 'isLoggedIn'>) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateMerchant: (data: Partial<MerchantData>) => void;
}

export const MerchantContext = createContext<MerchantContextType | undefined>(undefined);
