
"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LegalView from '@/components/views/LegalView';
import { useRouter } from 'next/navigation';

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans dir-rtl">
      <Header />
      <main>
        <LegalView type="terms" onBack={() => router.back()} />
      </main>
      <Footer onGoToSystems={() => router.push('/systems')} />
    </div>
  );
}
