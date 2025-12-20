"use client";

import React from 'react';
import BookingsDashboard from '@/components/dashboard/systems/bookings/BookingsDashboard';
import { useRouter, useSearchParams } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/shared/config';
import { ThemeProvider } from '@/components/common/ThemeContext';

export default function BookingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = (searchParams.get('type') as BusinessType) || 'clinic';

  return (
    <ThemeProvider>
      <BookingsDashboard 
        onLogout={() => router.push('/')} 
        onSwitchType={(type: BusinessType) => router.push(`/dashboard/bookings?type=${encodeURIComponent(type)}`)}
        type={typeParam}
      />
    </ThemeProvider>
  );
}
