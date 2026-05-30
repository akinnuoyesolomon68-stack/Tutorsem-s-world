import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

export const About = () => {
  const { siteContent } = useAppContext();

  return (
    <div className="w-full relative">
      <div className="pt-20 pb-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-gray-900 mb-8">
              About TUTORSEM
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
              {siteContent.aboutIntro}
            </p>
          </motion.div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="md:col-span-2 relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2676&auto=format&fit=crop" alt="Brand Lifestyle" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/10"></div>
            </motion.div>
            <div className="grid grid-cols-1 gap-6">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="relative aspect-square rounded-3xl overflow-hidden shadow-lg">
                 <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop" alt="Products in use" className="w-full h-full object-cover" />
               </motion.div>
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="relative aspect-square rounded-3xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center group overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" alt="Founder" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                 <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-semibold text-lg">Founder & CEO</p>
                 </div>
               </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-semibold tracking-tight mb-8 relative inline-block">
                Story & Journey
                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-amber-400 rounded-full"></span>
              </h2>
              <div className="prose prose-gray text-lg">
                <p className="text-gray-600 leading-relaxed mb-6">
                  My journey began with a curiosity for design and technology. Over the years, I've honed my skills to create user-centric designs that not only look beautiful but perform exceptionally well.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Combining my passion for creativity with entrepreneurship, I launched this platform. It serves as both a showcase of my design portfolio and a curated marketplace to provide quality products and resources to students and professionals alike.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-semibold tracking-tight mb-8 relative inline-block">
                Skills & Expertise
                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-amber-400 rounded-full"></span>
              </h2>
              <div className="space-y-6">
                {[
                  { name: 'UI/UX Design', level: 'Expert' },
                  { name: 'Frontend Development', level: 'Advanced' },
                  { name: 'Branding & Graphics', level: 'Expert' },
                  { name: 'E-commerce Management', level: 'Advanced' },
                ].map((skill, index) => (
                  <div key={index} className="flex justify-between items-center group cursor-default">
                    <span className="font-medium text-gray-900 text-lg group-hover:text-amber-600 transition-colors">{skill.name}</span>
                    <span className="text-sm font-semibold tracking-wide text-amber-800 bg-amber-100 px-4 py-1.5 rounded-full shadow-sm">{skill.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
