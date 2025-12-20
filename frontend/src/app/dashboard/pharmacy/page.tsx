"use client";

import React from 'react';
import PharmacyDashboard from '@/components/dashboard/systems/pharmacy/PharmacyDashboard';
import { useRouter } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/shared/config';
import { ThemeProvider } from '@/components/common/ThemeContext';

export default function PharmacyPage() {
  const router = useRouter();

  return (
    <ThemeProvider>
      <PharmacyDashboard 
        onLogout={() => router.push('/')} 
        onSwitchType={(type: BusinessType) => router.push(`/dashboard?type=${encodeURIComponent(type)}`)}
      />
    </ThemeProvider>
  );
}
