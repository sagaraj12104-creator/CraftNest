import React from 'react';
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#2A1B17] text-[#D7CCC8] pt-12 pb-24 sm:pb-12 border-t border-[#3D2924]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/logo.png" 
                alt="Vkonts & loops" 
                className="w-6 h-6 rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://ui-avatars.com/api/?name=V+L&background=C86D51&color=fff';
                }}
              />
              <h2 className="text-xl font-bold text-white font-serif tracking-tight">
                Vkonts <span className="text-[#C86D51]">& loops</span>
              </h2>
            </div>
            <p className="text-xs leading-relaxed mb-4 text-[#D7CCC8]/80">
              Preserving traditional artisanship by connecting master craftspeople directly to you. Every piece tells a story of heritage and care.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-[#3D2924] flex items-center justify-center hover:bg-[#C86D51] hover:text-white transition-colors text-[10px] font-bold">
                FB
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#3D2924] flex items-center justify-center hover:bg-[#C86D51] hover:text-white transition-colors text-[10px] font-bold">
                IG
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#3D2924] flex items-center justify-center hover:bg-[#C86D51] hover:text-white transition-colors text-[10px] font-bold">
                TW
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-[#C86D51] transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-[#C86D51] transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-[#C86D51] transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-[#C86D51] transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-[#C86D51] transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-[#C86D51] transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-[#C86D51] transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-[#C86D51] transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 text-[#C86D51]" />
                <span className="text-[#D7CCC8]/80">42 Heritage Park Road,<br />Indiranagar, Bengaluru</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-[#C86D51]" />
                <span className="text-[#D7CCC8]/80">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-[#C86D51]" />
                <span className="text-[#D7CCC8]/80">hello@handmadecraft.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#3D2924] flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-[#D7CCC8]/60">
          <p>&copy; {new Date().getFullYear()} Vkonts & loops handmade studio. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
