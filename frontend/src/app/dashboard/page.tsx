
"use client";

import React, { Suspense, useEffect, useState } from 'react';
import Dashboard from '@/components/Dashboard';
import { useRouter, useSearchParams } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/config';
import { ThemeProvider } from '@/components/common/ThemeContext';

function DashboardPageContent() {
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
    <ThemeProvider>
      <Dashboard 
        initialType={businessType} 
        onLogout={() => router.push('/')} 
      />
    </ThemeProvider>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <DashboardPageContent />
    </Suspense>
  );
}
