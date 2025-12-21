"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GymPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard?type=gym');
  }, [router]);

  return (
    null
  );
}
