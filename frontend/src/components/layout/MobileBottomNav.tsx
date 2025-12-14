
import React from 'react';
import { Home, Grid, ShoppingCart, User, Heart } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  cartCount?: number;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentView, onNavigate, cartCount = 3 }) => {
  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'categories', label: 'الأقسام', icon: Grid },
    { id: 'cart', label: 'السلة', icon: ShoppingCart, badge: cartCount },
    { id: 'favorites', label: 'المفضلة', icon: Heart },
    { id: 'profile', label: 'حسابي', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-safe z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-colors duration-300">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-90 transition-transform duration-200 ${
              currentView === item.id 
                ? 'text-ray-blue dark:text-ray-gold' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            <div className="relative">
              <item.icon className={`w-6 h-6 ${currentView === item.id ? 'fill-current' : ''}`} />
              {item.badge ? (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-sm">
                  {item.badge}
                </span>
              ) : null}
            </div>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;
