import React from 'react';
import { Home, ShoppingBag, Package, User, ShieldAlert } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const BottomNav = () => {
  const { activeTab, setActiveTab, isAdmin, requireAuth } = useShop();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, authRequired: false },
    { id: 'shop', label: 'Shop', icon: ShoppingBag, authRequired: false },
    { id: 'orders', label: 'Orders', icon: Package, authRequired: true },
    { id: 'account', label: 'Account', icon: User, authRequired: true },
  ];

  const handleTabClick = (item) => {
    if (item.authRequired) {
      requireAuth(() => setActiveTab(item.id));
    } else {
      setActiveTab(item.id);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md md:hidden">
      <nav className="bg-[#2A1B17] text-[#EFEBE9] rounded-full p-2 shadow-2xl border border-[#4A322C] flex items-center justify-around backdrop-blur-md bg-opacity-95">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-[#543831] text-white shadow-md font-medium scale-105'
                  : 'text-[#D7CCC8] hover:text-white hover:bg-[#3D2924]'
              }`}
              aria-label={item.label}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
              {isActive && (
                <span className="text-xs font-semibold tracking-wide animate-fade-in">
                  {item.label}
                </span>
              )}
              {item.id === 'orders' && !isActive && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C86D51] ring-2 ring-[#2A1B17]" />
              )}
            </button>
          );
        })}

        {isAdmin && (
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'admin'
                ? 'bg-[#C86D51] text-white'
                : 'text-[#E0A96D] hover:bg-[#3D2924]'
            }`}
            title="Admin Dashboard"
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden sm:inline">Admin</span>
          </button>
        )}
      </nav>
    </div>
  );
};
