import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Gem, Users } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const About = () => {
  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Hero Section */}
      <div className="pt-24 pb-20 px-6 md:px-12 bg-[#0F172A] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6D28D9]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10B981]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-heading"
          >
            Redefining Your Style.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 font-sans max-w-3xl mx-auto leading-relaxed"
          >
            Motun's Unisex is a premium e-commerce platform committed to delivering luxurious, high-quality fashion and lifestyle products directly to you.
          </motion.p>
        </div>
      </div>

      {/* Stats/Values Row */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-16 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-[#0F172A]/5 border border-gray-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center mb-4"><Gem className="w-6 h-6" /></div>
            <h3 className="font-bold text-[#0F172A] font-heading">Premium Quality</h3>
            <p className="text-sm text-gray-500 mt-2">Curated high-end products.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-[#0F172A]/5 border border-gray-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4"><Truck className="w-6 h-6" /></div>
            <h3 className="font-bold text-[#0F172A] font-heading">Fast Delivery</h3>
            <p className="text-sm text-gray-500 mt-2">Swift worldwide shipping.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-[#0F172A]/5 border border-gray-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-green-50 text-[#10B981] flex items-center justify-center mb-4"><ShieldCheck className="w-6 h-6" /></div>
            <h3 className="font-bold text-[#0F172A] font-heading">Secure Payments</h3>
            <p className="text-sm text-gray-500 mt-2">100% protected checkout.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-[#0F172A]/5 border border-gray-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F59E0B] flex items-center justify-center mb-4"><Users className="w-6 h-6" /></div>
            <h3 className="font-bold text-[#0F172A] font-heading">Community</h3>
            <p className="text-sm text-gray-500 mt-2">Built for students & pros.</p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-16 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 relative z-10">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop" alt="Boutique" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-1/2 -right-8 w-1/2 aspect-square rounded-3xl overflow-hidden bg-gray-100 border-8 border-[#F8FAFC] z-20 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop" alt="Fashion details" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-6 font-heading">The Motun's Unisex Journey.</h2>
          <div className="space-y-6 text-gray-600 font-sans text-lg">
            <p>
              Motun's Unisex was born out of a desire to bridge the gap between high-end fashion and accessibility. We noticed that students, young professionals, and trendsetters often had to compromise on quality to find affordable styles, or pay exorbitant prices for premium goods.
            </p>
            <p>
              We established Motun's Unisex to change that. By partnering directly with independent designers and established vendors, we curate collections that embody modern luxury without the traditional markups.
            </p>
            <p>
              From everyday sneakers to luxury footwear, student essentials to tech accessories—our catalog is meticulously selected to ensure that every item you purchase adds unique value to your lifestyle.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Manager Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-16 lg:py-24 border-t border-gray-100 flex flex-col md:flex-row items-center gap-12">
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
            className="w-full md:w-2/3"
        >
           <h2 className="text-3xl font-bold text-[#0F172A] mb-6 font-heading">Meet The MD</h2>
           <p className="text-lg text-gray-600 font-sans leading-relaxed">
             With a visionary approach to modern fashion, Miss Akinnuoye Motunrayo ensures every piece that arrives at Motun's Unisex reflects the absolute highest standards of quality, luxury, and approachability. Dedicated to redefining shopping experiences, she combines industry expertise with an unwavering commitment to customer satisfaction. 
           </p>
        </motion.div>
      </div>
    </div>
  );
};
