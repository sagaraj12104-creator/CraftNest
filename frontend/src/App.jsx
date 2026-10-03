import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AuthModal } from './components/AuthModal';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Orders } from './pages/Orders';
import { Account } from './pages/Account';
import { AdminPage } from './pages/AdminPage';

import { Footer } from './components/Footer';

const MainContent = () => {
  const { activeTab } = useShop();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home': return <Home />;
      case 'shop': return <Shop />;
      case 'orders': return <Orders />;
      case 'account': return <Account />;
      case 'admin': return <AdminPage />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-between">
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full">
          {renderTabContent()}
        </main>
        <Footer />
      </div>

      <CartDrawer />
      <WishlistDrawer />
      <AuthModal />
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
