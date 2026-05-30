import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { useAppContext, PortfolioItem } from '../context/AppContext';

export const Portfolio = () => {
  const { portfolioItems } = useAppContext();
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Split items into 2 columns for a simple fake masonry layout
  const col1 = portfolioItems.filter((_, i) => i % 2 === 0);
  const col2 = portfolioItems.filter((_, i) => i % 2 !== 0);

  return (
    <div className="w-full bg-white min-h-screen pt-12 pb-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-gray-900 mb-12">Creative Portfolio</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            {col1.map(item => (
              <PortfolioCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
            ))}
          </div>
          <div className="space-y-8 md:mt-16">
            {col2.map(item => (
               <PortfolioCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
            ))}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[100] bg-gray-900/40 backdrop-blur-sm p-4 md:p-12 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col pointer-events-auto"
            >
              <div className="p-4 flex justify-end sticky top-0 right-0 z-10">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100 shadow-sm transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-6 md:px-12 pb-12">
                <div className="aspect-[16/9] bg-gray-100 rounded-2xl overflow-hidden mb-8">
                  <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-2">{selectedItem.title}</h2>
                    <span className="text-sm font-medium tracking-wide text-amber-600 uppercase bg-amber-50 px-3 py-1 rounded-full">{selectedItem.category}</span>
                    <p className="text-gray-600 leading-relaxed mt-6 text-lg">{selectedItem.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PortfolioCard: React.FC<{ item: PortfolioItem, onClick: () => void }> = ({ item, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group cursor-pointer relative overflow-hidden rounded-[2rem] bg-gray-100"
    >
      <img src={item.image} alt={item.title} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
        >
          <span className="text-sm font-medium tracking-wide text-amber-300 uppercase mb-2 block">{item.category}</span>
          <h3 className="text-2xl font-semibold text-white mb-2">{item.title}</h3>
          <div className="flex items-center space-x-2 text-white/80 font-medium">
            <span>View Project</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
