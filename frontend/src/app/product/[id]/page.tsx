
"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductDetailView from '@/components/views/ProductDetailView';
import { useRouter, useParams } from 'next/navigation';

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans dir-rtl">
      <Header 
        goHome={() => router.push('/')}
        onNavigate={(view: string) => router.push(`/${view}`)}
      />
      <main>
        <ProductDetailView onBack={() => router.back()} />
      </main>
      <Footer onGoToSystems={() => router.push('/systems')} />
    </div>
  );
}
