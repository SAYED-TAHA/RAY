
"use client";

import React, { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchResultsView from '@/components/views/SearchResultsView';
import { useRouter, useSearchParams } from 'next/navigation';

function SearchPageContent() {
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
