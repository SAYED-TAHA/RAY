'use client';

import React from 'react';
import ClothingDashboard from '@/components/dashboard/systems/clothing/ClothingDashboard';

export default function ClothingPage() {
  const handleLogout = () => {
    console.log('Logout');
  };
  
  const handleSwitchType = (type: any) => {
    console.log('Switch to:', type);
  };

  return (
    <ClothingDashboard 
      onLogout={handleLogout}
      onSwitchType={handleSwitchType}
    />
  );
}
