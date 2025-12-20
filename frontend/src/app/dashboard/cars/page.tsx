'use client';

import React from 'react';
import CarsDashboard from '@/components/dashboard/systems/cars/CarsDashboard';
import { useRouter } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/shared/config';
import { ThemeProvider } from '@/components/common/ThemeContext';

export default function CarsPage() {
  const router = useRouter();

  return (
    <ThemeProvider>
      <CarsDashboard 
        onLogout={() => router.push('/')}
        onSwitchType={(type: BusinessType) => router.push(`/dashboard?type=${encodeURIComponent(type)}`)}
      />
    </ThemeProvider>
  );
}
