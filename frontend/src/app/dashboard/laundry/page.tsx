'use client';

import React from 'react';
import LaundryDashboard from '@/components/dashboard/systems/laundry/LaundryDashboard';
import { useRouter } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/shared/config';
import { ThemeProvider } from '@/components/common/ThemeContext';

export default function LaundryPage() {
  const router = useRouter();

  return (
    <ThemeProvider>
      <LaundryDashboard 
        onLogout={() => router.push('/')}
        onSwitchType={(type: BusinessType) => router.push(`/dashboard?type=${encodeURIComponent(type)}`)}
      />
    </ThemeProvider>
  );
}
