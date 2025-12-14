'use client';

import React from 'react';
import CarsDashboard from '@/components/dashboard/cars/CarsDashboard';

export default function CarsPage() {
  const handleLogout = () => {
    console.log('Logout');
  };
  
  const handleSwitchType = (type: any) => {
    console.log('Switch to:', type);
  };

  return (
    <CarsDashboard 
      onLogout={handleLogout}
      onSwitchType={handleSwitchType}
    />
  );
}
