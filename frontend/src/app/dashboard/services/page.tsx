'use client';

import React from 'react';
import ServicesDashboard from '@/components/dashboard/services/ServicesDashboard';

export default function ServicesPage() {
  const handleLogout = () => {
    console.log('Logout');
  };
  
  const handleSwitchType = (type: any) => {
    console.log('Switch to:', type);
  };

  return (
    <ServicesDashboard 
      onLogout={handleLogout}
      onSwitchType={handleSwitchType}
    />
  );
}
