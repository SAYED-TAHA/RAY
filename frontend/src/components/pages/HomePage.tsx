"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Loader } from 'lucide-react';
import Image from 'next/image';
import ProductCard from '../cards/ProductCard';
import { API_URL } from '@/utils/api';

interface Offer {
  id: string;
  title: string;
  shop: string;
  image: string;
  price: string;
  oldPrice?: string;
  rating: number;
  tag?: string;
}

interface HomePageProps {
  onProductClick?: (id: string) => void;
  onNavigate?: (view: string, params?: any) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onProductClick, onNavigate }) => {
  const [greeting, setGreeting] = useState('أهلاً بك');
  const [featuredOffers, setFeaturedOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('صباح الخير ☀️');
    else if (hour < 18) setGreeting('مساء الخير 🌤️');
    else setGreeting('مساء السعادة 🌙');
  }, []);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/offers/featured`);
        if (response.ok) {
          const data = await response.json();
          setFeaturedOffers(data);
        }
      } catch (error) {
        console.error('خطأ في جلب العروض:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-ray-blue overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 animate-pulse"></div>
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-ray-gold/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            
            <div className="text-center md:text-right max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-ray-gold font-bold text-sm border border-white/10 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Sparkles className="w-4 h-4" />
                {greeting}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                راي - <span className="text-ray-gold inline-block transform hover:scale-110 transition duration-300 cursor-default">نوّر</span> طريق نجاحك
              </h2>
              <p className="text-base md:text-xl text-blue-100 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                المنصة الرقمية المتكاملة الأولى في مصر. اطلب أكلك، اشتري لبسك، احجز ملعبك، وجدد شقتك.. كله في مكان واحد وبضغطة زر.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <button 
                  onClick={() => onNavigate?.('category_listing')}
                  className="px-8 py-4 bg-ray-gold text-ray-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(253,184,19,0.3)] hover:shadow-[0_0_30px_rgba(253,184,19,0.5)] hover:-translate-y-1 transition duration-300 w-full sm:w-auto active:scale-95 flex items-center justify-center gap-2 group"
                >
                  <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition duration-300" />
                  ابدأ التسوق الآن
                </button>
                <button 
                  onClick={() => onNavigate?.('offers')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-lg rounded-xl hover:bg-white hover:text-ray-blue transition duration-300 w-full sm:w-auto active:scale-95 flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition duration-300" />
                  اكتشف العروض
                </button>
              </div>
            </div>

            {/* Hero Image Composition */}
            <div className="relative hidden md:block w-[450px] h-[450px] animate-in zoom-in duration-1000">
              <div className="absolute inset-0 bg-gradient-to-t from-ray-blue via-transparent to-transparent z-20"></div>
              <div className="relative w-full h-full transform rotate-[-6deg] hover:rotate-0 transition duration-700 z-10 group">
                <Image 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80" 
                  alt="App Experience" 
                  fill
                  className="rounded-3xl shadow-2xl border-4 border-white/10 object-cover group-hover:scale-105 transition duration-700"
                  priority
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl z-30 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <ShoppingBag className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold">طلب جديد</p>
                    <p className="text-sm font-bold text-gray-900">تم التوصيل بنجاح ✅</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Offers Section */}
      <section className="bg-white dark:bg-gray-900 py-16 border-y border-gray-100 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">🔥 عروض مميزة وحصرية</h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition">←</button>
              <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition">→</button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader className="w-12 h-12 text-ray-blue animate-spin mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">جاري تحميل العروض...</p>
              </div>
            </div>
          ) : featuredOffers.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 dark:text-gray-400">لا توجد عروض متاحة حالياً</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredOffers.map((offer) => (
                <div key={offer.id} className="h-full">
                  <ProductCard 
                    onClick={onProductClick}
                    product={{
                      ...offer,
                      name: offer.title,
                      price: parseInt(offer.price.replace(/\D/g, '')),
                      oldPrice: offer.oldPrice ? parseInt(offer.oldPrice.replace(/\D/g, '')) : undefined,
                      merchant: offer.shop,
                      rating: offer.rating,
                      discount: offer.tag
                    }} 
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;
