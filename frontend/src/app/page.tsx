
"use client";

import React from 'react';
import Marketplace from '@/components/Marketplace';
import { useRouter } from 'next/navigation';

export default function MarketplaceHome() {
  const router = useRouter();

  return (
    <Marketplace 
      onGoToSystems={() => router.push('/systems')} 
      onProductClick={(id) => router.push(`/product/${id}`)}
    />
  );
}
