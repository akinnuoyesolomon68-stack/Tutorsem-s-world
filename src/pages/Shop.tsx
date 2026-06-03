import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, Heart, ShoppingBag, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { CATEGORIES, Product } from '../data/products';

export const Shop = () => {
  const { category } = useParams<{ category: string }>();
  const { products, addToCart, toggleWishlist, isInWishlist } = useAppContext();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(category || 'all');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<number>(300);
  
  const currentCategory = activeCategory !== 'all' 
    ? CATEGORIES.find(c => c.id === activeCategory)?.name 
    : 'All Products';

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesPrice = product.price <= priceRange;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, activeCategory, priceRange]);

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen pb-24">
      {/* Header Banner */}
      <div className="bg-[#0F172A] pt-12 pb-16 px-4 md:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#6D28D9]/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">{currentCategory}</h1>
          <p className="text-gray-400 font-sans max-w-2xl mx-auto">
            Explore our curated selection of premium products designed to elevate your lifestyle.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar / Filters */}
        <div className={`lg:w-1/4 flex flex-col gap-6 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-[#0F172A] mb-4 uppercase tracking-wider text-sm">Search</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-[#0F172A] mb-4 uppercase tracking-wider text-sm">Categories</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setActiveCategory('all')}
                  className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-[#0F172A] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  All Products
                </button>
              </li>
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <button 
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat.id ? 'bg-[#0F172A] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-[#0F172A] mb-4 uppercase tracking-wider text-sm flex justify-between">
              Max Price: <span>₦{priceRange}</span>
            </h3>
            <input 
              type="range" 
              min="0" 
              max="500" 
              value={priceRange} 
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#6D28D9]"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
              <span>₦0</span>
              <span>₦500+</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm font-medium">Showing {filteredProducts.length} products</p>
            <button 
              className="lg:hidden flex items-center gap-2 text-sm font-bold bg-white px-4 py-2 rounded-lg border border-gray-200"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl text-center border border-gray-100">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0F172A] mb-2 font-heading">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('all'); setPriceRange(500);}}
                className="mt-6 text-[#6D28D9] font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                 <motion.div 
                 key={product.id}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
               >
                 <div className="relative overflow-hidden aspect-[4/5] bg-gray-100">
                   <img src={product.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80'} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                   
                   {/* Overlay badges */}
                   {product.discountBadge && (
                     <div className="absolute top-3 left-3 bg-[#10B981] text-white text-xs font-bold px-2 py-1 rounded-[4px] z-10">
                       {product.discountBadge}
                     </div>
                   )}
                   {product.isNew && (
                     <div className="absolute top-3 left-3 bg-[#6D28D9] text-white text-xs font-bold px-2 py-1 rounded-[4px] z-10">
                       NEW
                     </div>
                   )}

                   {/* Wishlist Heart */}
                   <button 
                     onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                     className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur text-gray-400 hover:text-[#F59E0B] hover:bg-white transition-colors"
                   >
                     <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-[#F59E0B] text-[#F59E0B]' : ''}`} />
                   </button>
                 </div>

                 <div className="p-5 flex flex-col flex-1">
                   <div className="flex items-center justify-between mb-2">
                     <span className="text-[10px] font-bold tracking-wider text-[#6D28D9] uppercase">{product.subCategory || product.category}</span>
                     <div className="flex items-center space-x-1">
                       <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                       <span className="text-xs font-medium text-gray-600">{product.rating}</span>
                     </div>
                   </div>
                   <h3 className="text-base font-bold text-[#0F172A] mb-1 line-clamp-1 font-heading">{product.name}</h3>
                   <div className="flex items-center mt-auto pt-4 justify-between gap-2">
                     <span className="text-lg font-black text-[#0F172A] font-sans">₦{product.price.toFixed(2)}</span>
                     <button 
                       onClick={() => addToCart(product)}
                       disabled={!product.inStock} 
                       className="text-xs font-bold text-[#0F172A] bg-[#F59E0B] px-4 py-2 rounded-full hover:bg-[#D97706] hover:text-white transition-colors duration-300 disabled:opacity-50 flex items-center gap-2"
                     >
                       {product.inStock ? <><ShoppingBag className="w-3 h-3"/> Add</> : 'Sold Out'}
                     </button>
                   </div>
                 </div>
               </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
