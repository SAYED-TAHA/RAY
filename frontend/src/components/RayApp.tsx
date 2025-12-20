
"use client";

import React, { useState, useEffect } from 'react';
import Marketplace from './Marketplace';
import Dashboard from './Dashboard';
import SystemsHubWorldwide from './systems/SystemsHubWorldwide';
import MerchantRegisterView from './views/MerchantRegisterView';
// import { ViewState } from '../types'; // Removed - types.ts was deleted
import { BusinessType } from './dashboard/config';
import { ThemeProvider } from '@/components/common/ThemeContext';
import { ToastProvider } from '@/components/common/ToastContext';
import { AuthProvider } from '@/context/AuthContext';

const RayApp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<string>('marketplace');
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType>('restaurant');
  const [isRegistering, setIsRegistering] = useState(false);

  // Splash Screen Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 1. Go to Systems Hub (Landing Page)
  const goToSystemsHub = () => {
    setCurrentView('systems_hub');
    window.scrollTo(0, 0);
  };

  // 2. Back to Consumer Marketplace
  const goHome = () => {
    setCurrentView('marketplace');
    setIsRegistering(false);
    window.scrollTo(0, 0);
  };

  // 3. Start Registration Flow (from Hub)
  const startRegistration = (type: string) => {
    setSelectedBusinessType(type as BusinessType);
    setIsRegistering(true); 
    // We stay in SYSTEMS_HUB view conceptually, but show the registration component
    // Alternatively, you could have a REGISTRATION view state.
    // For simplicity here, I'll use a conditional render in the main return.
  };

  // 4. Complete Registration -> Go to Dashboard
  const completeRegistration = (type: string) => {
     setSelectedBusinessType(type as BusinessType);
     setIsRegistering(false);
     setCurrentView('dashboard');
     window.scrollTo(0, 0);
  };

  // 5. Logout
  const handleLogout = () => {
    setCurrentView('systems_hub');
    setIsRegistering(false);
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
          {isLoading ? (
            <div className="fixed inset-0 bg-ray-blue flex items-center justify-center z-50 flex-col">
              <div className="w-24 h-24 bg-ray-gold rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(253,184,19,0.4)] animate-bounce">
                <span className="text-6xl font-black text-ray-blue">R</span>
              </div>
              <h1 className="text-3xl font-black text-white mt-6 tracking-wider animate-pulse">RAY</h1>
              <p className="text-blue-200 mt-2 text-sm font-medium">نور طريق نجاحك</p>
            </div>
          ) : (
            <>
              {/* CONSUMER MARKETPLACE */}
              {currentView === 'marketplace' && (
                <Marketplace onGoToSystems={goToSystemsHub} />
              )}
              
              {/* BUSINESS SYSTEMS HUB & REGISTRATION */}
              {currentView === 'systems_hub' && (
                isRegistering ? (
                  <MerchantRegisterView 
                    systemId={selectedBusinessType}
                    onComplete={completeRegistration}
                    onBack={() => setIsRegistering(false)}
                  />
                ) : (
                  <SystemsHubWorldwide 
                    onSystemSelect={startRegistration} 
                    onBackToMarketplace={goHome}
                  />
                )
              )}

              {/* MERCHANT DASHBOARD */}
              {currentView === 'dashboard' && (
                <Dashboard 
                  initialType={selectedBusinessType} 
                  onLogout={handleLogout} 
                />
              )}
            </>
          )}
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default RayApp;
