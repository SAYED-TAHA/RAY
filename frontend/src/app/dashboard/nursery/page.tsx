"use client";

import React from 'react';
import BookingsDashboard from '@/components/dashboard/systems/bookings/BookingsDashboard';
import { useRouter } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/shared/config';
import { ThemeProvider } from '@/components/common/ThemeContext';

export default function NurseryPage() {
  const router = useRouter();

  return (
    <ThemeProvider>
      <BookingsDashboard 
        onLogout={() => router.push('/')} 
        onSwitchType={(type: BusinessType) => router.push(`/dashboard?type=${encodeURIComponent(type)}`)}
        type="nursery"
      />
    </ThemeProvider>
  );
}
