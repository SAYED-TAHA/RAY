"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClinicPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard?type=clinic');
  }, [router]);

  return (
    null
  );
}
