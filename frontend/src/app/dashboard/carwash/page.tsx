'use client';

import React from 'react';
import CarWashDashboard from '@/components/dashboard/carwash/CarWashDashboard';

export default function CarWashPage() {
  const handleLogout = () => {
    console.log('Logout');
  };
  
  const handleSwitchType = (type: any) => {
    console.log('Switch to:', type);
  };

  return (
    <CarWashDashboard 
      onLogout={handleLogout}
      onSwitchType={handleSwitchType}
    />
  );
}
