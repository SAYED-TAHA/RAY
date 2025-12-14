
"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchResultsView from '@/components/views/SearchResultsView';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans dir-rtl">
      <Header />
      <main>
        <SearchResultsView query={query} />
      </main>
      <Footer onGoToSystems={() => router.push('/systems')} />
    </div>
  );
}
