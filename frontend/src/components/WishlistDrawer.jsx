import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { api } from '../services/api';

export const WishlistDrawer = () => {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    isWishlistOpen,
    setIsWishlistOpen,
    setIsCartOpen
  } = useShop();

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    if (isWishlistOpen) {
      api.getProducts().then(setAllProducts);
    }
  }, [isWishlistOpen]);

  if (!isWishlistOpen) return null;

  const wishlistProducts = allProducts.filter(p => wishlist.includes(p.id));

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    toggleWishlist(product.id);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FDFBF7] h-full flex flex-col shadow-2xl animate-fade-in">
        {/* Drawer Header */}
        <div className="p-4 bg-[#C86D51] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-current" />
            <h2 className="font-serif font-bold text-lg">My Wishlist</h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 text-[#8C7A70]">
              <Heart className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#C86D51]" />
              <p className="text-base font-semibold">Your wishlist is empty</p>
              <p className="text-xs mt-1">Tap the heart icon on any product to save items!</p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div key={product.id} className="flex gap-3 bg-white p-3 rounded-2xl border border-[#E8DFD8] shadow-xs items-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-xl bg-[#F7F4EF]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-xs text-[#2A1B17] truncate">{product.name}</h4>
                  <p className="text-[11px] text-[#8C7A70]">{product.category}</p>
                  <p className="text-xs font-bold text-[#C86D51] mt-0.5">${product.price.toFixed(2)}</p>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="p-2 bg-[#2A1B17] text-white hover:bg-[#543831] rounded-xl shadow transition-transform active:scale-95 text-xs flex items-center gap-1 font-semibold"
                    title="Move to Cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Cart</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="text-gray-400 hover:text-red-500 p-1"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
