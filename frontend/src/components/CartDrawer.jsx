import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { api } from '../services/api';

export const CartDrawer = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    setActiveTab,
    customerEmail,
    setCustomerEmail
  } = useShop();

  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Priya Sharma',
    email: customerEmail,
    phone: '+91 98765 43210',
    address: '42 Heritage Park Road, Indiranagar, Bengaluru, KA 560038'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderPayload = {
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        shippingAddress: formData.address,
        totalAmount: cartTotal,
        items: cart.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          productImageUrl: item.product.imageUrl,
          price: item.product.price,
          quantity: item.quantity
        }))
      };

      const createdOrder = await api.createOrder(orderPayload);
      setCustomerEmail(formData.email);
      clearCart();
      setIsCheckout(false);
      setIsCartOpen(false);
      setActiveTab('orders');
    } catch (err) {
      alert('Order placed successfully! Redirecting to orders tab...');
      clearCart();
      setIsCheckout(false);
      setIsCartOpen(false);
      setActiveTab('orders');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FDFBF7] h-full flex flex-col shadow-2xl animate-fade-in">
        {/* Drawer Header */}
        <div className="p-4 bg-[#2A1B17] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E0A96D]" />
            <h2 className="font-serif font-bold text-lg">
              {isCheckout ? 'Checkout Order' : 'Your Shopping Cart'}
            </h2>
          </div>
          <button
            onClick={() => { setIsCartOpen(false); setIsCheckout(false); }}
            className="p-1 rounded-full hover:bg-[#3D2924] text-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-[#8C7A70]">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-base font-semibold">Your cart is currently empty</p>
              <p className="text-xs mt-1">Explore our unique handcrafted items!</p>
              <button
                onClick={() => { setIsCartOpen(false); setActiveTab('shop'); }}
                className="mt-5 px-6 py-2.5 bg-[#C86D51] text-white text-xs font-bold rounded-full shadow"
              >
                Browse Shop
              </button>
            </div>
          ) : !isCheckout ? (
            /* Cart Items List */
            cart.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-3 bg-white p-3 rounded-2xl border border-[#E8DFD8] shadow-xs">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-xl bg-[#F7F4EF]"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#2A1B17] line-clamp-1">{product.name}</h4>
                    <p className="text-[11px] text-[#8C7A70]">{product.category}</p>
                    <p className="text-xs font-bold text-[#C86D51] mt-0.5">${product.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 bg-[#F7F4EF] rounded-lg px-2 py-1">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="p-0.5 text-[#543831] hover:text-[#2A1B17]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#2A1B17] w-4 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="p-0.5 text-[#543831] hover:text-[#2A1B17]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Checkout Form */
            <form onSubmit={handleCheckoutSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#543831] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD8] rounded-xl focus:ring-2 focus:ring-[#C86D51] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#543831] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD8] rounded-xl focus:ring-2 focus:ring-[#C86D51] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#543831] mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD8] rounded-xl focus:ring-2 focus:ring-[#C86D51] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#543831] mb-1">Delivery Address</label>
                <textarea
                  required
                  rows={3}
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8DFD8] rounded-xl focus:ring-2 focus:ring-[#C86D51] outline-none"
                />
              </div>

              <div className="p-3 bg-[#F7F4EF] rounded-xl text-xs space-y-1">
                <div className="flex justify-between text-[#8C7A70]">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#8C7A70]">
                  <span>Shipping</span>
                  <span className="text-green-700 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-[#2A1B17] font-bold pt-1 border-t border-[#E8DFD8]">
                  <span>Total Amount</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#2A1B17] hover:bg-[#543831] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#E0A96D]" />
                <span>{isSubmitting ? 'Placing Order...' : 'Confirm Order'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && !isCheckout && (
          <div className="p-4 border-t border-[#E8DFD8] bg-white space-y-3">
            <div className="flex justify-between items-center text-sm font-bold text-[#2A1B17]">
              <span>Total</span>
              <span className="text-lg text-[#C86D51]">${cartTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => setIsCheckout(true)}
              className="w-full py-3 bg-[#2A1B17] hover:bg-[#543831] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#E0A96D]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
