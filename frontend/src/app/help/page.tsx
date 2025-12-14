"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HelpCenterView from '@/components/views/HelpCenterView';
import { useRouter } from 'next/navigation';

export default function HelpPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans dir-rtl">
      <Header />
      <main>
        <HelpCenterView onNavigate={(view: string) => router.push(`/${view}`)} />
      </main>
      <Footer onGoToSystems={() => router.push('/systems')} />
    </div>
  );
}
