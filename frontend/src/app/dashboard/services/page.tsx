'use client';

import React from 'react';
import ServicesDashboard from '@/components/dashboard/systems/services/ServicesDashboard';
import { useRouter } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/shared/config';

export default function ServicesPage() {
  const router = useRouter();

  return (
    <ServicesDashboard 
      onLogout={() => router.push('/')}
      onSwitchType={(type: BusinessType) => router.push(`/dashboard?type=${encodeURIComponent(type)}`)}
    />
  );
}
