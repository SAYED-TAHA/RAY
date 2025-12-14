
"use client";

import React, { useState, useEffect } from 'react';
import MerchantPublicView from '@/components/views/MerchantPublicView';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import GeminiAssistant from '@/components/common/GeminiAssistant';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Merchant {
  id: string;
  name: string;
  category: string;
  type: string;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  cover: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
}

export default function MerchantPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'food';
  const id = params.id;
  
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMerchant = async () => {
      try {
        setIsLoading(true);
        const merchantId = Array.isArray(id) ? id[0] : id;
        const response = await fetch(`${API_URL}/api/merchants/${merchantId}`);
        if (response.ok) {
          const data = await response.json();
          setMerchant(data);
        }
      } catch (error) {
        console.error('خطأ في جلب بيانات المتجر:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMerchant();
    }
  }, [id]);

  if (isLoading || !merchant) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 font-sans text-ray-black dark:text-white dir-rtl flex items-center justify-center">
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans text-ray-black dark:text-white dir-rtl">
      <MerchantPublicView 
        merchant={merchant} 
        onBack={() => router.back()} 
      />
      <GeminiAssistant context="customer" />
    </div>
  );
}
