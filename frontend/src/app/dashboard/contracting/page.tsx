'use client';

import React from 'react';
import ContractingDashboard from '@/components/dashboard/systems/contracting/ContractingDashboard';
import { useRouter } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/shared/config';

export default function ContractingPage() {
  const router = useRouter();

  return (
    <ContractingDashboard 
      onLogout={() => router.push('/')}
      onSwitchType={(type: BusinessType) => router.push(`/dashboard?type=${encodeURIComponent(type)}`)}
    />
  );
}
