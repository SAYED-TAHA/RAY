
"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTrackingView from '@/components/views/OrderTrackingView';
import { useRouter } from 'next/navigation';

export default function OrderTrackingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans dir-rtl">
      <Header />
      <main className="pt-4 pb-20">
        <OrderTrackingView onBack={() => router.push('/profile')} />
      </main>
      <Footer onGoToSystems={() => router.push('/systems')} />
    </div>
  );
}
