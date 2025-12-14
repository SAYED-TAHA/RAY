'use client';

import React from 'react';
import RetailDashboard from '@/components/dashboard/systems/retail/RetailDashboard';

export default function RetailPage() {
  const handleLogout = () => {
    console.log('Logout');
  };
  
  const handleSwitchType = (type: any) => {
    console.log('Switch to:', type);
  };

  return (
    <RetailDashboard 
      onLogout={handleLogout}
      onSwitchType={handleSwitchType}
    />
  );
}
