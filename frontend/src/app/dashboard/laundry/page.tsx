'use client';

import React from 'react';
import LaundryDashboard from '@/components/dashboard/laundry/LaundryDashboard';

export default function LaundryPage() {
  const handleLogout = () => {
    console.log('Logout');
  };
  
  const handleSwitchType = (type: any) => {
    console.log('Switch to:', type);
  };

  return (
    <LaundryDashboard 
      onLogout={handleLogout}
      onSwitchType={handleSwitchType}
    />
  );
}
