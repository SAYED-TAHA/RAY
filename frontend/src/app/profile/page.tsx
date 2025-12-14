
"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import UserProfileView from '@/components/views/ProfileView';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans dir-rtl">
      <Header />
      <main className="pt-4">
        <UserProfileView />
      </main>
      <Footer onGoToSystems={() => router.push('/systems')} />
    </div>
  );
}
