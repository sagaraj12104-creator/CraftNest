import React, { useState } from 'react';
import { X, LogIn, UserPlus, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { api } from '../services/api';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    loginUser,
    authPendingCallback,
    setAuthPendingCallback
  } = useShop();

  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setErrorMessage('');
    setAuthPendingCallback(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      if (authMode === 'login') {
        const user = await api.login({ email: formData.email, password: formData.password });
        loginUser(user);
      } else {
        const user = await api.register({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
          role: 'USER'
        });
        loginUser(user);
      }

      // Execute pending action after successful auth!
      if (authPendingCallback) {
        authPendingCallback();
        setAuthPendingCallback(null);
      }

      handleClose();
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = (email, role = 'USER') => {
    const demoUser = {
      id: role === 'ADMIN' ? 2 : 1,
      fullName: role === 'ADMIN' ? 'Store Administrator' : 'Priya Sharma',
      email: email,
      phone: role === 'ADMIN' ? '+91 99999 88888' : '+91 98765 43210',
      address: role === 'ADMIN' ? 'Craft Studio HQ, New Delhi' : '42 Heritage Park Road, Indiranagar, Bengaluru, KA 560038',
      role: role
    };
    loginUser(demoUser);

    if (authPendingCallback) {
      authPendingCallback();
      setAuthPendingCallback(null);
    }
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto animate-fade-in border border-[#E8DFD8]">
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 border-b border-[#E8DFD8]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2A1B17] text-[#E0A96D] flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#2A1B17]">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h3>
              <p className="text-[11px] text-[#8C7A70]">Sign in to add to wishlist, cart & place orders</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-[#F3EDE6] text-gray-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Login / Register Tab Selectors */}
        <div className="flex bg-[#F7F4EF] p-1 rounded-2xl border border-[#E8DFD8]">
          <button
            type="button"
            onClick={() => { setAuthMode('login'); setErrorMessage(''); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'login'
                ? 'bg-[#2A1B17] text-white shadow-xs'
                : 'text-[#543831] hover:bg-white/50'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </button>

          <button
            type="button"
            onClick={() => { setAuthMode('register'); setErrorMessage(''); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'register'
                ? 'bg-[#2A1B17] text-white shadow-xs'
                : 'text-[#543831] hover:bg-white/50'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Register</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleFormSubmit} className="space-y-3">
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-[#543831] mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Priya Sharma"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-2.5 bg-white border border-[#E8DFD8] rounded-xl text-xs text-[#2A1B17] outline-none focus:ring-2 focus:ring-[#C86D51]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#543831] mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="priya@example.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2.5 bg-white border border-[#E8DFD8] rounded-xl text-xs text-[#2A1B17] outline-none focus:ring-2 focus:ring-[#C86D51]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#543831] mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2.5 bg-white border border-[#E8DFD8] rounded-xl text-xs text-[#2A1B17] outline-none focus:ring-2 focus:ring-[#C86D51]"
            />
          </div>

          {authMode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#543831] mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-[#E8DFD8] rounded-xl text-xs text-[#2A1B17] outline-none focus:ring-2 focus:ring-[#C86D51]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#543831] mb-1">Delivery Address</label>
                <textarea
                  required
                  rows={2}
                  placeholder="42 Heritage Park Road, Bengaluru"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-[#E8DFD8] rounded-xl text-xs text-[#2A1B17] outline-none focus:ring-2 focus:ring-[#C86D51]"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#2A1B17] hover:bg-[#543831] text-white font-bold text-xs rounded-xl shadow-md transition-all mt-2"
          >
            {isSubmitting
              ? 'Processing...'
              : authMode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* 1-Click Quick Demo Login Shortcuts */}
        <div className="pt-3 border-t border-[#E8DFD8] space-y-2">
          <span className="text-[10px] font-bold text-[#8C7A70] uppercase tracking-wider block text-center">
            Or Quick Demo Login
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('priya@example.com', 'USER')}
              className="px-3 py-2 bg-[#F7F4EF] hover:bg-[#EFEBE9] text-[#2A1B17] text-[11px] font-bold rounded-xl border border-[#E8DFD8] transition-colors"
            >
              Demo User (Priya)
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin@handmadecraft.com', 'ADMIN')}
              className="px-3 py-2 bg-[#2A1B17] text-[#E0A96D] text-[11px] font-bold rounded-xl transition-colors flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Demo Admin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
