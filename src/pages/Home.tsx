import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag, Truck, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { CATEGORIES } from '../data/products';

export const Home = () => {
  const { products, addToCart, toggleWishlist, isInWishlist } = useAppContext();
  const navigate = useNavigate();
  
  const featuredProducts = products.filter(p => p.rating >= 4.8).slice(0, 4);
  
  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Premium Hero Section */}
      <section className="relative pt-24 pb-32 px-4 md:px-8 lg:px-12 overflow-hidden flex items-center min-h-[90vh]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e07?q=80&w=2564&auto=format&fit=crop" 
            alt="Fashion and Lifestyle Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#6D28D9]/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-[#10B981]/20 text-[#10B981] text-sm font-semibold mb-6 border border-[#10B981]/30 uppercase tracking-wider">
              New Collection 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-sm font-heading">
              Redefine Your <span className="text-[#F59E0B] italic">Style.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light drop-shadow-sm max-w-xl font-sans">
              Discover a world where premium fashion meets everyday lifestyle. Experience luxury tailored for professionals, students, and trendsetters.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                to="/shop" 
                className="w-full sm:w-auto px-8 py-4 bg-[#F59E0B] text-[#0F172A] rounded-full font-bold hover:bg-[#F59E0B]/90 transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-[#F59E0B]/20 hover:-translate-y-1 transform duration-200"
              >
                <span>Shop Now</span>
                <ShoppingBag className="w-5 h-5" />
              </Link>
              <a 
                href="#categories" 
                className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-medium hover:bg-white/20 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Explore Categories</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-24 px-4 md:px-8 lg:px-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] font-heading">Shop by Category</h2>
            <p className="text-gray-500 mt-4 leading-relaxed font-sans">Find exactly what you are looking for in our diverse collections.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {CATEGORIES.map((cat) => (
              <Link key={cat.id} to={`/shop/category/${cat.id}`} className="group relative rounded-3xl overflow-hidden aspect-[4/3] block">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-white mb-2 font-heading">{cat.name}</h3>
                  <span className="inline-flex items-center text-[#F59E0B] font-medium text-sm">
                    Explore <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] font-heading">Trending Now</h2>
              <p className="text-gray-500 mt-2 font-sans">Premium quality items handpicked for you.</p>
            </div>
            <Link to="/shop" className="inline-flex items-center text-[#6D28D9] font-semibold hover:text-[#6D28D9]/80 transition-colors">
              View All Products <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative overflow-hidden aspect-[4/5] bg-gray-100 cursor-pointer" onClick={() => navigate('/shop')}>
                  <img src={product.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80'} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-0"></div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold tracking-wider text-[#6D28D9] uppercase">{product.category}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                      <span className="text-xs font-medium text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-1 line-clamp-1 font-heading cursor-pointer hover:text-[#6D28D9] transition-colors" onClick={() => navigate('/shop')}>{product.name}</h3>
                  <div className="flex items-center mt-auto pt-4 justify-between gap-2">
                    <span className="text-lg font-black text-[#0F172A] font-sans">₦{product.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock} 
                      className="text-xs font-bold text-[#0F172A] bg-[#F59E0B] px-4 py-2 rounded-full hover:bg-[#D97706] hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {product.inStock ? 'Add to Cart' : 'Sold Out'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] font-heading">The Motun's Unisex Difference</h2>
            <p className="text-gray-500 mt-4 font-sans max-w-2xl mx-auto">We provide an unmatched shopping experience combining quality with reliability.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Fast Delivery", text: "Express shipping worldwide on all orders above ₦100.", icon: Truck },
              { title: "Premium Quality", text: "Every item is authenticated and quality checked.", icon: Star },
              { title: "Secure Payments", text: "Your data is protected with military-grade encryption.", icon: ShieldCheck },
              { title: "24/7 Support", text: "Our team is here to help you anytime, anywhere.", icon: Clock },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 bg-[#F8FAFC] rounded-3xl group hover:-translate-y-2 transition-transform duration-300 border border-gray-100 hover:border-[#6D28D9]/20">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[#6D28D9] group-hover:scale-110 group-hover:bg-[#6D28D9] group-hover:text-white transition-all duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-[#0F172A] font-heading">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-sans">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Manager Section */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="w-full md:w-1/3 aspect-[3/4] max-w-sm mx-auto md:mx-0 rounded-3xl overflow-hidden shadow-2xl relative group"
          >
             <img src="https://i.ibb.co/xt4hVrMD/motun.jpg" alt="Miss Akinnuoye Motunrayo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent flex items-end p-8">
                <div>
                   <h3 className="text-2xl font-bold text-white font-heading">Miss Akinnuoye Motunrayo</h3>
                   <p className="text-[#F59E0B] font-medium font-sans mt-1">Managing Director</p>
                </div>
             </div>
          </motion.div>
          <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-2/3 text-center md:text-left"
          >
             <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-6 font-heading">Meet The MD</h2>
             <p className="text-lg text-gray-600 font-sans leading-relaxed mb-6">
               "At Motun's Unisex, we believe fashion is more than just clothing—it is an expression of confidence, individuality, and lifestyle. My vision is to bridge the gap between premium fashion and accessibility, offering handpicked pieces that elevate our clients' everyday lives."
             </p>
             <p className="text-lg text-gray-600 font-sans leading-relaxed font-bold">
               - Miss Akinnuoye Motunrayo
             </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Banner */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Star className="w-10 h-10 text-[#F59E0B] fill-[#F59E0B] mx-auto mb-8" />
          <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8 font-heading italic">
            "Motun's Unisex transformed my wardrobe. The quality is exceptional, and the pieces are exactly what I need to transition from campus directly to my corporate internship."
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-gray-600 rounded-full overflow-hidden">
               <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80" alt="Customer" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <h4 className="font-bold font-heading">Sarah Mitchell</h4>
              <p className="text-sm text-gray-400 font-sans">Student & Professional</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
