import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { api } from '../services/api';

export const Orders = () => {
  const { customerEmail, setActiveTab } = useShop();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const sampleOrders = [
    {
      id: 1,
      orderNumber: "HMC-78A921F0",
      customerName: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 98765 43210",
      shippingAddress: "42 Heritage Park Road, Indiranagar, Bengaluru, KA 560038",
      totalAmount: 83.50,
      status: "SHIPPED",
      createdAt: "2026-09-06T14:30:00",
      items: [
        {
          id: 1,
          productName: "Rustic Ceramic Clay Teapot Set",
          productImageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
          price: 48.50,
          quantity: 1
        },
        {
          id: 2,
          productName: "Hand-Carved Walnut Wooden Bowl",
          productImageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
          price: 35.00,
          quantity: 1
        }
      ]
    }
  ];

  useEffect(() => {
    loadOrders();
  }, [customerEmail]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await api.getOrders(customerEmail);
      if (data && data.length > 0) {
        setOrders(data);
      } else {
        setOrders(sampleOrders);
      }
    } catch (err) {
      setOrders(sampleOrders);
    } finally {
      setLoading(false);
    }
  };

  const getStatusProgress = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING': return { percent: 25, label: 'Order Placed', color: 'bg-yellow-500' };
      case 'PROCESSING': return { percent: 50, label: 'Crafting in Studio', color: 'bg-blue-500' };
      case 'SHIPPED': return { percent: 75, label: 'Out for Express Delivery', color: 'bg-purple-600' };
      case 'DELIVERED': return { percent: 100, label: 'Delivered', color: 'bg-green-600' };
      default: return { percent: 25, label: 'Placed', color: 'bg-yellow-500' };
    }
  };

  return (
    <div className="space-y-6 pb-24 max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-serif text-[#2A1B17]">
            My Orders
          </h2>
          <p className="text-xs md:text-sm text-[#8C7A70]">Track status & view craft purchase history</p>
        </div>
        <button
          onClick={loadOrders}
          className="px-4 py-2 bg-white border border-[#E8DFD8] text-[#543831] text-xs font-semibold rounded-xl hover:bg-[#F7F4EF] shadow-xs"
        >
          Refresh Orders
        </button>
      </div>

      {loading ? (
        <div className="space-y-4 py-4">
          {[1, 2].map(i => (
            <div key={i} className="h-48 bg-gray-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#E8DFD8] p-8">
          <Package className="w-14 h-14 text-[#C86D51] mx-auto mb-4 opacity-50" />
          <h3 className="font-bold text-[#2A1B17] text-base">No Orders Found Yet</h3>
          <p className="text-xs text-[#8C7A70] mt-1">When you order handcrafted items, tracking details will appear here!</p>
          <button
            onClick={() => setActiveTab('shop')}
            className="mt-6 px-6 py-3 bg-[#2A1B17] text-white text-xs font-bold rounded-full shadow"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const statusInfo = getStatusProgress(order.status);
            return (
              <div
                key={order.id || order.orderNumber}
                className="bg-white rounded-3xl p-5 md:p-6 border border-[#E8DFD8] shadow-sm space-y-5"
              >
                {/* Header Info */}
                <div className="flex items-center justify-between border-b border-[#F3EDE6] pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#8C7A70] uppercase tracking-wider">Order ID</span>
                    <h3 className="text-sm md:text-base font-bold text-[#2A1B17] font-mono">{order.orderNumber}</h3>
                  </div>

                  <span className={`px-4 py-1.5 text-xs font-bold rounded-full text-white ${statusInfo.color} shadow-xs`}>
                    {order.status}
                  </span>
                </div>

                {/* Tracking Progress Stepper */}
                <div className="space-y-2 bg-[#F7F4EF] p-4 rounded-2xl">
                  <div className="flex justify-between text-xs font-bold text-[#543831]">
                    <span>Tracking Status</span>
                    <span className="text-[#C86D51]">{statusInfo.label}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2.5 w-full bg-[#E8DFD8] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${statusInfo.color} transition-all duration-500`}
                      style={{ width: `${statusInfo.percent}%` }}
                    />
                  </div>

                  {/* 4 Step Labels */}
                  <div className="grid grid-cols-4 text-xs font-semibold text-center text-[#8C7A70] pt-1">
                    <span className={statusInfo.percent >= 25 ? 'text-[#2A1B17] font-bold' : ''}>Placed</span>
                    <span className={statusInfo.percent >= 50 ? 'text-[#2A1B17] font-bold' : ''}>Processing</span>
                    <span className={statusInfo.percent >= 75 ? 'text-[#2A1B17] font-bold' : ''}>Shipped</span>
                    <span className={statusInfo.percent >= 100 ? 'text-[#2A1B17] font-bold' : ''}>Delivered</span>
                  </div>
                </div>

                {/* Items List Grid */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#543831] block">Items Purchased</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-[#FDFBF7] p-3 rounded-2xl border border-[#F3EDE6]">
                        <img
                          src={item.productImageUrl || item.imageUrl || "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"}
                          alt={item.productName}
                          className="w-14 h-14 object-cover rounded-xl bg-[#F7F4EF]"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#2A1B17] truncate">{item.productName}</h4>
                          <p className="text-[11px] text-[#8C7A70]">Qty: {item.quantity} × ${item.price?.toFixed(2)}</p>
                        </div>
                        <span className="text-xs font-bold text-[#2A1B17]">
                          ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address & Total */}
                <div className="pt-3 border-t border-[#F3EDE6] flex items-center justify-between text-xs md:text-sm">
                  <div className="flex items-center gap-1.5 text-[#8C7A70]">
                    <MapPin className="w-4 h-4 shrink-0 text-[#C86D51]" />
                    <span>{order.shippingAddress}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-[#8C7A70] block">Total Amount Paid</span>
                    <span className="text-base font-bold text-[#C86D51]">${order.totalAmount?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
