'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import RestaurantDashboard from '@/components/dashboard/systems/restaurants/RestaurantDashboard';
import { BusinessType } from '@/components/dashboard/shared/config';

function RestaurantPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';

  return (
    <RestaurantDashboard 
      onLogout={() => router.push('/')}
      onSwitchType={(type: BusinessType) => router.push(`/dashboard?type=${encodeURIComponent(type)}`)}
      isDemo={isDemo}
    />
  );
}

export default function RestaurantPage() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <RestaurantPageContent />
    </Suspense>
  );
}
