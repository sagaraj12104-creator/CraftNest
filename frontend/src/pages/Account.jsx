import React, { useState } from 'react';
import { User, Heart, Package, ShieldCheck, MapPin, LogOut, ChevronRight, KeyRound, LogIn } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Account = () => {
  const {
    user,
    logoutUser,
    setIsAuthModalOpen,
    wishlist,
    isAdmin,
    setIsAdmin,
    setActiveTab,
    setIsWishlistOpen
  } = useShop();

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [passError, setPassError] = useState(false);

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (adminPass === 'admin123' || adminPass === 'admin' || adminPass === '') {
      setIsAdmin(true);
      setShowAdminModal(false);
      setAdminPass('');
      setPassError(false);
      setActiveTab('admin');
    } else {
      setPassError(true);
    }
  };

  if (!user) {
    return (
      <div className="py-16 text-center bg-white rounded-3xl border border-[#E8DFD8] p-8 max-w-md mx-auto space-y-4 my-8 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#2A1B17] text-[#E0A96D] flex items-center justify-center mx-auto shadow-md">
          <User className="w-8 h-8" />
        </div>
        <h3 className="font-serif font-bold text-xl text-[#2A1B17]">Sign In to Your Account</h3>
        <p className="text-xs text-[#8C7A70]">Please login or create an account to view profile, order history, and saved wishlist items.</p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="w-full py-3 bg-[#2A1B17] text-white font-bold text-xs rounded-xl shadow hover:bg-[#543831] transition-colors flex items-center justify-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          <span>Login / Register</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-serif text-[#2A1B17]">
          Account Profile
        </h2>

        <button
          onClick={logoutUser}
          className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 border border-red-200 text-xs font-bold rounded-xl hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-[#2A1B17] text-white p-6 md:p-8 rounded-3xl shadow-md flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#C86D51] text-white flex items-center justify-center font-bold text-2xl shadow-inner">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg md:text-xl">{user.fullName}</h3>
            <p className="text-xs md:text-sm text-[#D7CCC8]">{user.email}</p>
            <span className="inline-block mt-1.5 px-3 py-1 bg-[#543831] text-[#E0A96D] text-xs font-bold rounded-full">
              {user.role === 'ADMIN' ? 'Store Administrator' : 'Heritage Craft Member'}
            </span>
          </div>
        </div>
      </div>

      {/* Account Menu Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveTab('orders')}
          className="bg-white p-5 rounded-3xl border border-[#E8DFD8] shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between h-36"
        >
          <div className="p-3 rounded-2xl bg-[#F7F4EF] text-[#2A1B17] w-fit">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#2A1B17]">My Orders</h4>
            <p className="text-xs text-[#8C7A70] mt-0.5">View history & track shipment</p>
          </div>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="bg-white p-5 rounded-3xl border border-[#E8DFD8] shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between h-36"
        >
          <div className="p-3 rounded-2xl bg-[#F5EBE6] text-[#C86D51] w-fit">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#2A1B17]">My Wishlist</h4>
            <p className="text-xs text-[#8C7A70] mt-0.5">{wishlist.length} saved craft items</p>
          </div>
        </button>

        <div className="bg-white p-5 rounded-3xl border border-[#E8DFD8] shadow-sm text-left flex flex-col justify-between h-36">
          <div className="p-3 rounded-2xl bg-[#F7F4EF] text-[#2A1B17] w-fit">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#2A1B17]">Delivery Address</h4>
            <p className="text-xs text-[#8C7A70] mt-0.5 truncate">{user.address || '42 Heritage Park Road, Bengaluru'}</p>
          </div>
        </div>
      </div>

      {/* Admin Panel Access Banner */}
      <div className="bg-[#F7F4EF] border border-[#E0A96D]/40 p-6 rounded-3xl flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-[#2A1B17] text-[#E0A96D]">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#2A1B17]">Store Administrator</h4>
            <p className="text-xs text-[#6E5D54]">Manage products, hero photos slider & customer orders</p>
          </div>
        </div>

        {isAdmin ? (
          <button
            onClick={() => setActiveTab('admin')}
            className="px-5 py-2.5 bg-[#2A1B17] text-[#E0A96D] text-xs font-bold rounded-xl shadow hover:bg-[#3D2924] transition-colors"
          >
            Open Admin Panel
          </button>
        ) : (
          <button
            onClick={() => setShowAdminModal(true)}
            className="px-5 py-2.5 bg-[#C86D51] text-white text-xs font-bold rounded-xl shadow hover:bg-[#b05c42] transition-colors"
          >
            Admin Login
          </button>
        )}
      </div>

      {/* Admin Password Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4 animate-fade-in">
            <div className="flex justify-between items-center pb-2 border-b border-[#F3EDE6]">
              <div className="flex items-center gap-2 text-[#2A1B17]">
                <KeyRound className="w-5 h-5 text-[#C86D51]" />
                <h3 className="font-serif font-bold text-base">Admin Panel Login</h3>
              </div>
              <button onClick={() => setShowAdminModal(false)} className="text-gray-400">
                ✕
              </button>
            </div>

            <form onSubmit={handleAdminAuth} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#543831] mb-1">
                  Admin Passcode (Default: admin123)
                </label>
                <input
                  type="password"
                  placeholder="Enter passcode (or press submit)"
                  value={adminPass}
                  onChange={e => setAdminPass(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#E8DFD8] rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#C86D51]"
                />
                {passError && (
                  <p className="text-[11px] text-red-500 mt-1">Invalid passcode! Try 'admin123'</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#2A1B17] text-white text-xs font-bold rounded-xl shadow hover:bg-[#543831] transition-colors"
              >
                Unlock Admin Mode
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
