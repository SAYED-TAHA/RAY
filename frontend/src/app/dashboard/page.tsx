
"use client";

import React, { useEffect, useState } from 'react';
import Dashboard from '@/components/Dashboard';
import { useRouter, useSearchParams } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/config';

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') as BusinessType;
  
  // Use client-side state to handle hydration correctly
  const [businessType, setBusinessType] = useState<BusinessType>('restaurant');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
      setIsMounted(true);
      if (typeParam) {
          setBusinessType(typeParam);
      }
  }, [typeParam]);

  if (!isMounted) return null;

  return (
    <Dashboard 
      initialType={businessType} 
      onLogout={() => router.push('/')} 
    />
  );
}
