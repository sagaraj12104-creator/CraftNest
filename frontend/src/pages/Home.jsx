import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Truck, Award } from 'lucide-react';
import { HeroSlider } from '../components/HeroSlider';
import { ProductCard } from '../components/ProductCard';
import { api } from '../services/api';
import { useShop } from '../context/ShopContext';

export const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([
    { name: 'Ceramics', icon: '🏺', color: 'bg-[#F5EBE6]' },
    { name: 'Textiles', icon: '🧵', color: 'bg-[#EBF2F5]' },
    { name: 'Woodwork', icon: '🪵', color: 'bg-[#F5F0E6]' },
    { name: 'Leather', icon: '💼', color: 'bg-[#F2EBEB]' },
    { name: 'Home Decor', icon: '🕯️', color: 'bg-[#EFEFF5]' }
  ]);
  const { setActiveTab } = useShop();

  const defaultProducts = [
    {
      id: 1,
      name: "Rustic Ceramic Clay Teapot Set",
      description: "Hand-thrown clay teapot with 4 matching cups.",
      price: 48.50,
      imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
      category: "Ceramics",
      material: "Clay",
      isNewArrival: true,
      rating: 4.9,
      artistName: "Master Artisan Kabir"
    },
    {
      id: 2,
      name: "Hand-Woven Indigo Shawl",
      description: "Organic cotton handloom shawl dyed with natural indigo.",
      price: 62.00,
      imageUrl: "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=800&q=80",
      category: "Textiles",
      material: "Cotton",
      isNewArrival: true,
      rating: 4.8,
      artistName: "Weavers Guild"
    },
    {
      id: 3,
      name: "Hand-Carved Walnut Wooden Bowl",
      description: "Carved from single block reclaimed dark walnut wood.",
      price: 35.00,
      imageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
      category: "Woodwork",
      material: "Wood",
      isNewArrival: true,
      rating: 4.9,
      artistName: "Forest Carvings Studio"
    },
    {
      id: 4,
      name: "Handcrafted Leather Bound Journal",
      description: "Full-grain vintage leather journal with deckle-edge pages.",
      price: 29.99,
      imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      category: "Leather Craft",
      material: "Leather",
      isNewArrival: true,
      rating: 4.7,
      artistName: "Craftsman Ankit"
    }
  ];

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      const [arrivalsData, catData] = await Promise.all([
        api.getNewArrivals(),
        api.getCategories()
      ]);

      if (arrivalsData && arrivalsData.length > 0) {
        setNewArrivals(arrivalsData);
      } else {
        setNewArrivals(defaultProducts);
      }

      if (catData && catData.length > 0) {
        const bgColors = ['bg-[#F5EBE6]', 'bg-[#EBF2F5]', 'bg-[#F5F0E6]', 'bg-[#F2EBEB]', 'bg-[#EFEFF5]'];
        const icons = ['🏺', '🧵', '🪵', '💼', '🕯️', '✨'];
        setCategories(catData.map((c, i) => ({
          name: c.name,
          icon: icons[i % icons.length],
          color: bgColors[i % bgColors.length]
        })));
      }
    } catch (err) {
      setNewArrivals(defaultProducts);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-24 animate-fade-in">
      {/* 1. Sliding Hero Photos Carousel */}
      <HeroSlider />

      {/* 2. Craft Categories Bar */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-base font-bold font-serif text-[#2A1B17] uppercase tracking-wider">
            Explore Categories
          </h3>
          <button
            onClick={() => setActiveTab('shop')}
            className="text-xs font-semibold text-[#C86D51] hover:underline flex items-center gap-1"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal scroll container for categories */}
        <div className="flex overflow-x-auto gap-3 pb-4 snap-x snap-mandatory hide-scrollbar -mx-1 px-1">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab('shop')}
              className={`${cat.color} border border-[#E8DFD8] flex items-center gap-3 px-5 py-3 rounded-2xl shrink-0 shadow-xs hover:shadow-md transition-all active:scale-95 text-left snap-center`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="text-sm font-bold text-[#2A1B17] whitespace-nowrap">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. NEW ARRIVALS Section */}
      <div className="bg-white rounded-3xl p-5 md:p-8 border border-[#E8DFD8] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C86D51] shrink-0" />
              <h2 className="text-xl md:text-2xl font-bold font-serif text-[#2A1B17]">
                New Arrivals
              </h2>
            </div>
            <p className="text-xs md:text-sm text-[#8C7A70] mt-1 leading-snug pr-4">
              Freshly crafted pieces direct from artisan studios
            </p>
          </div>

          <button
            onClick={() => setActiveTab('shop')}
            className="w-full sm:w-auto px-4 py-2.5 bg-[#F7F4EF] text-[#2A1B17] text-xs font-semibold rounded-xl hover:bg-[#EFEBE9] transition-colors text-center"
          >
            See All Catalog
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* 4. Heritage Value Props Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#2A1B17] text-white p-3.5 rounded-2xl flex items-center gap-3 shadow-sm">
          <div className="p-2 bg-[#3D2924] rounded-xl shrink-0">
            <Award className="w-5 h-5 text-[#E0A96D]" />
          </div>
          <div>
            <h4 className="font-bold text-sm leading-tight">100% Handmade</h4>
            <p className="text-[10px] text-[#D7CCC8] mt-0.5 leading-tight">Authentic artisan crafted goods</p>
          </div>
        </div>

        <div className="bg-[#C86D51] text-white p-3.5 rounded-2xl flex items-center gap-3 shadow-sm">
          <div className="p-2 bg-[#b05c42] rounded-xl shrink-0">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-sm leading-tight">Safe Express Delivery</h4>
            <p className="text-[10px] text-white/80 mt-0.5 leading-tight">Eco-friendly safe packaging</p>
          </div>
        </div>

        <div className="bg-[#543831] text-white p-3.5 rounded-2xl flex items-center gap-3 shadow-sm">
          <div className="p-2 bg-[#3D2924] rounded-xl shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#E0A96D]" />
          </div>
          <div>
            <h4 className="font-bold text-sm leading-tight">Verified Artisans</h4>
            <p className="text-[10px] text-[#D7CCC8] mt-0.5 leading-tight">Fair wages & direct support</p>
          </div>
        </div>

        <div className="bg-[#2A1B17] text-white p-3.5 rounded-2xl flex items-center gap-3 shadow-sm">
          <div className="p-2 bg-[#3D2924] rounded-xl shrink-0">
            <HeartHandshake className="w-5 h-5 text-[#C86D51]" />
          </div>
          <div>
            <h4 className="font-bold text-sm leading-tight">Sustainable Materials</h4>
            <p className="text-[10px] text-[#D7CCC8] mt-0.5 leading-tight">Natural clay, wood & cotton</p>
          </div>
        </div>
      </div>
    </div>
  );
};
