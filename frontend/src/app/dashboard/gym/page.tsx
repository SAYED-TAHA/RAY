"use client";

import React from 'react';
import BookingsDashboard from '@/components/dashboard/bookings/BookingsDashboard';
import { useRouter } from 'next/navigation';

export default function GymPage() {
  const router = useRouter();

  return (
    <BookingsDashboard 
      onLogout={() => router.push('/')} 
      onSwitchType={(type) => router.push(`/dashboard/${type}`)}
      type="gym"
    />
  );
}
