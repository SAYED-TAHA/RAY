"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SalonPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard?type=salon');
  }, [router]);

  return (
    null
  );
}
