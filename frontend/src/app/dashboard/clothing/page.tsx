'use client';

import React from 'react';
import ClothingDashboard from '@/components/dashboard/systems/clothing/ClothingDashboard';
import { useRouter } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/shared/config';
import { ThemeProvider } from '@/components/common/ThemeContext';

export default function ClothingPage() {
  const router = useRouter();

  return (
    <ThemeProvider>
      <ClothingDashboard 
        onLogout={() => router.push('/')}
        onSwitchType={(type: BusinessType) => router.push(`/dashboard?type=${encodeURIComponent(type)}`)}
      />
    </ThemeProvider>
  );
}
