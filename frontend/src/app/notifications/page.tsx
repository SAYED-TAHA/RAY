
"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NotificationsView from '@/components/views/NotificationsView';
import { useRouter } from 'next/navigation';

export default function NotificationsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans dir-rtl">
      <Header />
      <main className="pt-4 pb-20">
        <NotificationsView />
      </main>
      <Footer onGoToSystems={() => router.push('/systems')} />
    </div>
  );
}
