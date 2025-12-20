'use client';

import React from 'react';
import CarWashDashboard from '@/components/dashboard/systems/carwash/CarWashDashboard';
import { useRouter } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/shared/config';
import { ThemeProvider } from '@/components/common/ThemeContext';

export default function CarWashPage() {
  const router = useRouter();

  return (
    <ThemeProvider>
      <CarWashDashboard 
        onLogout={() => router.push('/')}
        onSwitchType={(type: BusinessType) => router.push(`/dashboard?type=${encodeURIComponent(type)}`)}
      />
    </ThemeProvider>
  );
}
