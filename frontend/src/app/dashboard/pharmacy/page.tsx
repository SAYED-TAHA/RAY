"use client";

import React from 'react';
import PharmacyDashboard from '@/components/dashboard/pharmacy/PharmacyDashboard';
import { useRouter } from 'next/navigation';

export default function PharmacyPage() {
  const router = useRouter();

  return (
    <PharmacyDashboard 
      onLogout={() => router.push('/')} 
      onSwitchType={(type) => router.push(`/dashboard?type=${type}`)}
    />
  );
}
