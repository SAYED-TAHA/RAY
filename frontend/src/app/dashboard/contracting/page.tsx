'use client';

import React from 'react';
import ContractingDashboard from '@/components/dashboard/contracting/ContractingDashboard';

export default function ContractingPage() {
  const handleLogout = () => {
    console.log('Logout');
  };
  
  const handleSwitchType = (type: any) => {
    console.log('Switch to:', type);
  };

  return (
    <ContractingDashboard 
      onLogout={handleLogout}
      onSwitchType={handleSwitchType}
    />
  );
}
