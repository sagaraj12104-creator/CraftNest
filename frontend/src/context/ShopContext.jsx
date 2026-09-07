import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('hmc_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('hmc_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('hmc_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    const savedUser = localStorage.getItem('hmc_user');
    if (savedUser) {
      const u = JSON.parse(savedUser);
      return u.role === 'ADMIN';
    }
    return localStorage.getItem('hmc_is_admin') === 'true';
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authPendingCallback, setAuthPendingCallback] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('hmc_user', JSON.stringify(user));
      if (user.role === 'ADMIN') setIsAdmin(true);
    } else {
      localStorage.removeItem('hmc_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('hmc_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('hmc_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('hmc_is_admin', isAdmin);
  }, [isAdmin]);

  const loginUser = (userData) => {
    setUser(userData);
    if (userData.role === 'ADMIN') {
      setIsAdmin(true);
    }
  };

  const logoutUser = () => {
    setUser(null);
    setIsAdmin(false);
    setCart([]);
    setWishlist([]);
    setActiveTab('home');
  };

  // Guard Helper: Prompts AuthModal if user is not logged in!
  const requireAuth = (callback) => {
    if (user) {
      if (callback) callback();
    } else {
      setAuthPendingCallback(() => callback);
      setIsAuthModalOpen(true);
    }
  };

  const addToCart = (product, qty = 1) => {
    requireAuth(() => {
      setCart(prev => {
        const existingIndex = prev.findIndex(item => item.product.id === product.id);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex].quantity += qty;
          return updated;
        }
        return [...prev, { product, quantity: qty }];
      });
      setIsCartOpen(true);
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId) => {
    requireAuth(() => {
      setWishlist(prev => {
        if (prev.includes(productId)) {
          return prev.filter(id => id !== productId);
        }
        return [...prev, productId];
      });
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider value={{
      user,
      isLoggedIn: Boolean(user),
      loginUser,
      logoutUser,
      requireAuth,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authPendingCallback,
      setAuthPendingCallback,
      activeTab,
      setActiveTab,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartItemCount,
      wishlist,
      toggleWishlist,
      isInWishlist,
      isAdmin,
      setIsAdmin,
      customerEmail: user?.email || 'priya@example.com',
      isCartOpen,
      setIsCartOpen,
      isWishlistOpen,
      setIsWishlistOpen
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
