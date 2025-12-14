"use client";

import React from 'react';
import BookingsDashboard from '@/components/dashboard/bookings/BookingsDashboard';
import { useRouter, useSearchParams } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/config';

export default function BookingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = (searchParams.get('type') as BusinessType) || 'clinic';

  return (
    <BookingsDashboard 
      onLogout={() => router.push('/')} 
      onSwitchType={(type) => router.push(`/dashboard/bookings?type=${type}`)}
      type={typeParam}
    />
  );
}
