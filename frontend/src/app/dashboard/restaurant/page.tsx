'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import RestaurantDashboard from '@/components/dashboard/systems/restaurants/RestaurantDashboard';

function RestaurantPageContent() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';

  const handleLogout = () => {
    console.log('Logout');
  };
  
  const handleSwitchType = (type: any) => {
    console.log('Switch to:', type);
  };

  return (
    <RestaurantDashboard 
      onLogout={handleLogout}
      onSwitchType={handleSwitchType}
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
