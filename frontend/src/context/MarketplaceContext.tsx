"use client";

import React, { createContext, useContext, useState } from 'react';

interface MarketplaceContextType {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedMerchant: any | null;
  setSelectedMerchant: (merchant: any | null) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  cart: any[];
  addToCart: (item: any, isReservation?: boolean, deposit?: number) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMerchant, setSelectedMerchant] = useState<any | null>(null);
  const [currentView, setCurrentView] = useState('home');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const addToCart = (item: any, isReservation = false, deposit = 0) => {
    setCart(prev => [...prev, { ...item, isReservation, deposit, id: Date.now() }]);
  };

  return (
    <MarketplaceContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedMerchant,
        setSelectedMerchant,
        currentView,
        setCurrentView,
        favorites,
        toggleFavorite,
        isFavorite,
        cart,
        addToCart
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
