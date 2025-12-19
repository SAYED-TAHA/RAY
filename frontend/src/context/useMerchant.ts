"use client";

import { useContext } from 'react';
import { MerchantContext } from './merchant-context';

export const useMerchant = () => {
  const context = useContext(MerchantContext);
  if (!context) {
    throw new Error('useMerchant يجب أن يكون داخل MerchantProvider');
  }
  return context;
};
