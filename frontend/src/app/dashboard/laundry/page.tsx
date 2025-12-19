'use client';

import React from 'react';
import LaundryDashboard from '@/components/dashboard/systems/laundry/LaundryDashboard';
import { useRouter } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/shared/config';

export default function LaundryPage() {
  const router = useRouter();

  return (
    <LaundryDashboard 
      onLogout={() => router.push('/')}
      onSwitchType={(type: BusinessType) => router.push(`/dashboard?type=${encodeURIComponent(type)}`)}
    />
  );
}
