'use client';

import React from 'react';
import RetailDashboard from '@/components/dashboard/systems/retail/RetailDashboard';
import { useRouter } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/shared/config';
import { ThemeProvider } from '@/components/common/ThemeContext';

export default function RetailPage() {
  const router = useRouter();

  return (
    <ThemeProvider>
      <RetailDashboard 
        onLogout={() => router.push('/')}
        onSwitchType={(type: BusinessType) => router.push(`/dashboard?type=${encodeURIComponent(type)}`)}
      />
    </ThemeProvider>
  );
}
