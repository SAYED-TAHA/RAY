'use client';

import React from 'react';
import ServicesDashboard from '@/components/dashboard/systems/services/ServicesDashboard';
import { useRouter } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/shared/config';
import { ThemeProvider } from '@/components/common/ThemeContext';

export default function ServicesPage() {
  const router = useRouter();

  return (
    <ThemeProvider>
      <ServicesDashboard 
        onLogout={() => router.push('/')}
        onSwitchType={(type: BusinessType) => router.push(`/dashboard?type=${encodeURIComponent(type)}`)}
      />
    </ThemeProvider>
  );
}
