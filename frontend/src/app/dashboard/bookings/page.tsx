"use client";

import React, { Suspense } from 'react';
import BookingsDashboard from '@/components/dashboard/systems/bookings/BookingsDashboard';
import { useRouter, useSearchParams } from 'next/navigation';
import { BusinessType } from '@/components/dashboard/shared/config';
import { ThemeProvider } from '@/components/common/ThemeContext';

function BookingsPageContent() {
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

export default function BookingsPage() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <BookingsPageContent />
    </Suspense>
  );
}
