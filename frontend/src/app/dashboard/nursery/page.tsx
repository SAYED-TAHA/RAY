"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NurseryPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard?type=nursery');
  }, [router]);

  return (
    null
  );
}
