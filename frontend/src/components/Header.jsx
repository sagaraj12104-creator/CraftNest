import React from 'react';
import { Heart, ShoppingBag, Sparkles, Search, Home, Package, User, ShieldAlert, LogIn, LogOut } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Header = () => {
  const {
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAuthModalOpen,
    requireAuth,
    activeTab,
    setActiveTab,
    isAdmin,
    user,
    logoutUser
  } = useShop();

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E8DFD8] px-4 sm:px-6 lg:px-8 py-3.5 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#2A1B17] text-[#E0A96D] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#2A1B17] tracking-tight leading-none font-serif">
              Handmade<span className="text-[#C86D51]">Craft</span>
            </h1>
            <p className="text-[10px] text-[#8C7A70] uppercase font-semibold tracking-wider">Artisanal Studio</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  if (link.id === 'orders' || link.id === 'account') {
                    requireAuth(() => setActiveTab(link.id));
                  } else {
                    setActiveTab(link.id);
                  }
                }}
                className={`flex items-center gap-2 text-sm font-semibold transition-all py-1 border-b-2 ${
                  isActive
                    ? 'border-[#C86D51] text-[#C86D51]'
                    : 'border-transparent text-[#543831] hover:text-[#C86D51]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </button>
            );
          })}

          {isAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'admin'
                  ? 'bg-[#C86D51] text-white shadow-sm'
                  : 'bg-[#2A1B17] text-[#E0A96D] hover:bg-[#3D2924]'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Admin Panel</span>
            </button>
          )}
        </nav>

        {/* Right Action Icons (Wishlist, Cart, Login/Profile) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveTab('shop')}
            className="p-2 rounded-full text-[#543831] hover:bg-[#F3EDE6] transition-colors"
            title="Search Products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Button (Requires Auth) */}
          <button
            onClick={() => requireAuth(() => setIsWishlistOpen(true))}
            className="relative p-2.5 rounded-full bg-white border border-[#E8DFD8] text-[#543831] hover:bg-[#F3EDE6] transition-colors shadow-xs"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C86D51] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button (Requires Auth) */}
          <button
            onClick={() => requireAuth(() => setIsCartOpen(true))}
            className="relative p-2.5 rounded-full bg-[#2A1B17] text-[#E0A96D] hover:bg-[#3D2924] transition-colors shadow-md flex items-center gap-2 px-4"
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden sm:inline text-xs font-bold text-white">Cart</span>
            {cartItemCount > 0 && (
              <span className="w-5 h-5 bg-[#C86D51] text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* User Auth Pill Button */}
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('account')}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#F7F4EF] border border-[#E8DFD8] text-[#2A1B17] text-xs font-bold rounded-xl"
              >
                <User className="w-3.5 h-3.5 text-[#C86D51]" />
                <span className="truncate max-w-[100px]">{user.fullName?.split(' ')[0]}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#C86D51] hover:bg-[#b05c42] text-white text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
