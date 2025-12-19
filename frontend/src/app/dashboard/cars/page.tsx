'use client';

import React from 'react';
import CarsDashboard from '@/components/dashboard/systems/cars/CarsDashboard';
import { useRouter } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/shared/config';

export default function CarsPage() {
  const router = useRouter();

  return (
    <CarsDashboard 
      onLogout={() => router.push('/')}
      onSwitchType={(type: BusinessType) => router.push(`/dashboard?type=${encodeURIComponent(type)}`)}
    />
  );
}
