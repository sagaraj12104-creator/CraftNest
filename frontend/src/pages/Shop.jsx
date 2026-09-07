import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, RefreshCw } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { api } from '../services/api';

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['All', 'Ceramics', 'Textiles', 'Woodwork', 'Leather Craft', 'Home Decor'];
  const materials = ['All', 'Clay', 'Cotton', 'Wood', 'Leather', 'Brass'];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedMaterial, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (selectedMaterial !== 'All') params.material = selectedMaterial;
      params.maxPrice = maxPrice;
      params.sortBy = sortBy;

      const data = await api.getProducts(params);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedMaterial('All');
    setMaxPrice(100);
    setSortBy('featured');
  };

  const filteredProducts = products.filter(p => p.price <= maxPrice);

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      {/* Top Search & Filter Trigger */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-serif text-[#2A1B17]">
              Craft Catalog
            </h2>
            <p className="text-xs text-[#8C7A70]">Discover unique handcrafted pieces from master artisans</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 bg-[#F7F4EF] rounded-full text-[#543831]">
            {filteredProducts.length} Items Available
          </span>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7A70]" />
            <input
              type="text"
              placeholder="Search pottery, textiles, woodwork..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#E8DFD8] rounded-2xl text-xs sm:text-sm text-[#2A1B17] focus:ring-2 focus:ring-[#C86D51] outline-none shadow-xs"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`px-5 py-3 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-xs ${
              isFilterOpen || selectedCategory !== 'All' || selectedMaterial !== 'All'
                ? 'bg-[#2A1B17] text-white border-[#2A1B17]'
                : 'bg-white text-[#543831] border-[#E8DFD8] hover:bg-[#F7F4EF]'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </form>

        {/* Category Pills Quick Select */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-[#C86D51] text-white shadow-xs'
                  : 'bg-white text-[#543831] border border-[#E8DFD8] hover:bg-[#F7F4EF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Expandable Filter Drawer Modal */}
      {isFilterOpen && (
        <div className="bg-white rounded-3xl p-5 md:p-6 border border-[#E8DFD8] shadow-md space-y-5 animate-fade-in">
          <div className="flex justify-between items-center pb-3 border-b border-[#F3EDE6]">
            <h3 className="font-bold text-sm text-[#2A1B17] uppercase tracking-wider font-serif">
              Filter Options
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-[#C86D51] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
              </button>
              <button onClick={() => setIsFilterOpen(false)} className="p-1 text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Craft Material Filter */}
            <div>
              <label className="block text-xs font-bold text-[#543831] mb-2">Material</label>
              <div className="flex flex-wrap gap-2">
                {materials.map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`px-3 py-1.5 rounded-xl text-xs transition-colors ${
                      selectedMaterial === mat
                        ? 'bg-[#2A1B17] text-white font-semibold'
                        : 'bg-[#F7F4EF] text-[#6E5D54] hover:bg-[#EFEBE9]'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <div className="flex justify-between text-xs font-bold text-[#543831] mb-2">
                <span>Max Price</span>
                <span className="text-[#C86D51]">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="5"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C86D51]"
              />
            </div>

            {/* Sort By Dropdown */}
            <div>
              <label className="block text-xs font-bold text-[#543831] mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-[#F7F4EF] border border-[#E8DFD8] rounded-xl outline-none"
              >
                <option value="featured">Featured Artisans</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Craft</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Product Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#E8DFD8]">
          <p className="text-base font-bold text-[#2A1B17]">No handcrafted products match your criteria</p>
          <p className="text-xs text-[#8C7A70] mt-1">Try broadening your search or resetting filters</p>
          <button
            onClick={resetFilters}
            className="mt-5 px-5 py-2.5 bg-[#2A1B17] text-white text-xs font-semibold rounded-full shadow"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
