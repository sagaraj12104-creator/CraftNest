import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { useShop } from '../context/ShopContext';

export const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setActiveTab } = useShop();

  const defaultSlides = [
    {
      id: 1,
      title: "Handcrafted Terracotta Pottery",
      subtitle: "Authentic clay craft moulded by master artisans with earthy warmth.",
      imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1600&q=80",
      buttonText: "Explore Pottery",
      categoryTag: "Ceramics"
    },
    {
      id: 2,
      title: "Hand-Woven Tribal Textiles",
      subtitle: "100% natural organic cotton scarves & woven tapestries crafted on handlooms.",
      imageUrl: "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=1600&q=80",
      buttonText: "Shop Textiles",
      categoryTag: "Textiles"
    },
    {
      id: 3,
      title: "Carved Teakwood Artifacts",
      subtitle: "Hand-carved wooden tableware, sculptures, and heritage bowls.",
      imageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1600&q=80",
      buttonText: "Discover Woodwork",
      categoryTag: "Woodwork"
    }
  ];

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async () => {
    const data = await api.getSlides();
    if (data && data.length > 0) {
      setSlides(data);
    } else {
      setSlides(defaultSlides);
    }
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl shadow-xl my-4 bg-[#2A1B17]">
      {/* Slide Image with Gradient Overlay */}
      <div className="relative h-[320px] sm:h-[400px] md:h-[480px] lg:h-[540px] w-full">
        <img
          src={currentSlide.imageUrl}
          alt={currentSlide.title}
          className="w-full h-full object-cover transition-all duration-700 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1310] via-[#2A1B17]/60 to-transparent flex flex-col justify-end p-6 md:p-12 text-white">
          <span className="inline-block self-start px-3.5 py-1.5 bg-[#C86D51] text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3 shadow-md">
            {currentSlide.categoryTag || "Handcrafted"}
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif leading-snug drop-shadow-md mb-2 max-w-2xl">
            {currentSlide.title}
          </h2>
          <p className="text-xs sm:text-base text-[#EFEBE9]/90 mb-6 line-clamp-2 max-w-xl">
            {currentSlide.subtitle}
          </p>

          <div>
            <button
              onClick={() => setActiveTab('shop')}
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#E0A96D] hover:bg-[#d49959] text-[#2A1B17] font-bold text-xs sm:text-sm rounded-full shadow-xl transition-transform active:scale-95"
            >
              <span>{currentSlide.buttonText || "Shop Collection"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Manual Slider Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-sm transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-sm transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-[#E0A96D]' : 'w-2.5 bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
