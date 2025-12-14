
"use client";

import React from 'react';
import SystemsHubWorldwide from '@/components/systems/SystemsHubWorldwide';
import SystemActivitySelector from '@/components/systems/SystemActivitySelector';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';

export default function SystemsPage() {
  const router = useRouter();
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  const handleSystemSelect = (systemId: string) => {
    setSelectedSystem(systemId);
  };

  const handleBackToMarketplace = () => {
    router.push('/');
  };

  const handleBackToSystems = () => {
    setSelectedSystem(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen font-sans">
        {selectedSystem ? (
          <SystemActivitySelector 
            systemId={selectedSystem} 
            onBack={handleBackToSystems} 
          />
        ) : (
          <SystemsHubWorldwide 
            onSystemSelect={handleSystemSelect} 
            onBackToMarketplace={handleBackToMarketplace} 
          />
        )}
      </div>
    </ThemeProvider>
  );
}
