"use client";

import React from 'react';
import BookingsDashboard from '@/components/dashboard/systems/bookings/BookingsDashboard';
import { useRouter } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/shared/config';

export default function SalonPage() {
  const router = useRouter();

  return (
    <BookingsDashboard 
      onLogout={() => router.push('/')} 
      onSwitchType={(type: BusinessType) => router.push(`/dashboard?type=${encodeURIComponent(type)}`)}
      type="salon"
    />
  );
}
