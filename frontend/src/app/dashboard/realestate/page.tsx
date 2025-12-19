'use client';

import React from 'react';
import RealEstateDashboard from '@/components/dashboard/systems/realestate/RealEstateDashboard';
import { useRouter } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/shared/config';

export default function RealEstatePage() {
  const router = useRouter();

  return (
    <RealEstateDashboard 
      onLogout={() => router.push('/')}
      onSwitchType={(type: BusinessType) => router.push(`/dashboard?type=${encodeURIComponent(type)}`)}
    />
  );
}
