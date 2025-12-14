'use client';

import React from 'react';
import RealEstateDashboard from '@/components/dashboard/realestate/RealEstateDashboard';

export default function RealEstatePage() {
  const handleLogout = () => {
    console.log('Logout');
  };
  
  const handleSwitchType = (type: any) => {
    console.log('Switch to:', type);
  };

  return (
    <RealEstateDashboard 
      onLogout={handleLogout}
      onSwitchType={handleSwitchType}
    />
  );
}
