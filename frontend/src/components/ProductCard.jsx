import React from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group bg-white rounded-2xl p-3 sm:p-4 border border-[#E8DFD8] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      {/* Top Image Container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F7F4EF] mb-3">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* New Arrival / Featured Badge */}
        {product.isNewArrival && (
          <span className="absolute top-2 left-2 px-2.5 py-0.5 bg-[#C86D51] text-white text-[10px] font-bold rounded-full shadow-sm">
            NEW
          </span>
        )}

        {/* Wishlist Heart Button (Triggers Login/Register Modal if not logged in!) */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-all ${
            inWishlist
              ? 'bg-[#C86D51] text-white scale-110'
              : 'bg-white/90 backdrop-blur-sm text-[#543831] hover:bg-white'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Artist Name Pill */}
        {product.artistName && (
          <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 bg-[#2A1B17]/85 backdrop-blur-md rounded-lg text-[10px] text-[#E0A96D] truncate">
            Crafted by: <span className="font-semibold text-white">{product.artistName}</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C7A70]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-[#C86D51]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold">{product.rating || 4.8}</span>
            </div>
          </div>

          <h3 className="font-serif font-bold text-xs sm:text-sm text-[#2A1B17] line-clamp-2 mb-1 group-hover:text-[#C86D51] transition-colors">
            {product.name}
          </h3>

          <p className="text-[11px] sm:text-xs text-[#6E5D54] line-clamp-1 mb-3">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart Button (Triggers Login/Register Modal if not logged in!) */}
        <div className="flex items-center justify-between pt-2 border-t border-[#F3EDE6]">
          <div>
            <span className="text-[10px] text-[#8C7A70] block">Price</span>
            <p className="text-sm sm:text-base font-bold text-[#2A1B17]">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#2A1B17] hover:bg-[#543831] text-white text-xs font-semibold rounded-xl shadow transition-transform active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
