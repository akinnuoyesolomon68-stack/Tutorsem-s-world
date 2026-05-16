import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag, Layout as LayoutIcon, PenTool } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Home = () => {
  const { siteContent, products, portfolioItems } = useAppContext();
  
  const featuredProducts = products.slice(0, 3);
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 md:px-12 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-teal-100 rounded-full blur-[120px] opacity-60"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-60"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-gray-900 leading-[1.1] mb-6">
              {siteContent.homeHeroTitle}
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
              {siteContent.homeHeroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                to="/marketplace" 
                className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Explore Products</span>
                <ShoppingBag className="w-4 h-4" />
              </Link>
              <Link 
                to="/portfolio" 
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <span>View Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full max-w-md md:max-w-none relative hidden md:block" // Hidden on mobile for cleaner hero if needed, but keeping it block for now
          >
            <div className="aspect-[4/5] md:aspect-square bg-gray-200 rounded-[2rem] overflow-hidden relative shadow-2xl">
               {/* Note: In real app, user will provide an image or upload one. Placeholder for now */}
               <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" alt="Creative Workspace" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories & Expertise */}
      <section className="py-24 px-6 md:px-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight mb-8">Creative Expertise</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
                    <LayoutIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Website Design</h3>
                    <p className="text-gray-500">Crafting modern, responsive, and user-centric digital experiences.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Graphics Design</h3>
                    <p className="text-gray-500">Creating strong visual identities, brand assets, and marketing materials.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
               <h2 className="text-3xl font-semibold tracking-tight mb-8">Popular Categories</h2>
               <div className="grid grid-cols-2 gap-4">
                  {['Accessories', 'Student Materials', 'Clothes', 'Shoes'].map((cat) => (
                    <Link key={cat} to={`/marketplace?category=${cat}`} className="p-6 border border-gray-100 rounded-2xl hover:border-teal-100 hover:bg-teal-50/50 transition-all group">
                      <h3 className="font-medium text-gray-900 group-hover:text-teal-700">{cat}</h3>
                      <p className="text-sm text-gray-500 mt-2">Browse the collection &rarr;</p>
                    </Link>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Featured Products</h2>
              <p className="text-gray-500 mt-2">Handpicked items from our marketplace.</p>
            </div>
            <Link to="/marketplace" className="hidden md:flex items-center text-teal-600 font-medium hover:text-teal-700">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm"
              >
                <div className="aspect-square bg-gray-100 relative group">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {product.isSold && (
                    <div className="absolute top-4 right-4 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                      SOLD OUT
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold tracking-wider text-teal-600 uppercase mb-2">{product.category}</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2 truncate">{product.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-semibold text-gray-900">₦{product.price.toLocaleString()}</span>
                    <button disabled={product.isSold} className="text-sm font-medium text-gray-900 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      {product.isSold ? 'Sold' : 'View'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
             <h2 className="text-3xl font-semibold tracking-tight">Recent Projects</h2>
             <p className="text-gray-500 mt-4 leading-relaxed">A glimpse into my latest website and graphics design projects.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.slice(0, 2).map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-[2rem] bg-gray-100 block aspect-[4/3]"
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-sm font-medium tracking-wide text-teal-300 uppercase mb-2 block">{item.category}</span>
                    <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
             <Link to="/portfolio" className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 group">
                View All Projects <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold tracking-tight mb-16">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Premium Quality", text: "Every product and design is crafted with the highest attention to detail.", icon: Star },
              { title: "Student Focused", text: "Curated materials and resources to help students excel creatively and academically.", icon: PenTool },
              { title: "Secure Marketplace", text: "A trusted platform offering genuine products with reliable support.", icon: LayoutIcon },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center bg-gray-50 p-8 rounded-[2rem]">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-teal-600">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
