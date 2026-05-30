import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, Presentation } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

export const DataAnalysis = () => {
  const { portfolioItems, products } = useAppContext();
  
  // Filter portfolio for data analysis projects if any
  const dataProjects = portfolioItems.filter(item => item.category === 'Data Analysis');
  // Filter products for data analysis products/services if any
  const dataProducts = products.filter(p => p.category === 'Data Analysis');

  return (
    <div className="w-full bg-gray-50 min-h-screen pt-20 pb-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-semibold tracking-tighter text-gray-900 mb-6"
          >
            Data Analysis Hub
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            Transforming raw data into actionable insights. Explore my data analysis projects, reports, and premium services.
          </motion.p>
        </div>

        {/* Services / What I do */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
          {[
            { title: 'Data Visualisation', icon: PieChart, text: 'Creating intuitive and interactive dashboards.' },
            { title: 'Business Intelligence', icon: BarChart3, text: 'Extracting valuable business insights.' },
            { title: 'Predictive Modeling', icon: TrendingUp, text: 'Forecasting trends and future outcomes.' },
            { title: 'Data Reporting', icon: Presentation, text: 'Detailed, easy-to-understand data reports.' },
          ].map((service, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              key={i}
              className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm"
            >
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Data Analysis Products/Services */}
        {dataProducts.length > 0 && (
          <div className="mb-24">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-3xl font-semibold tracking-tight">Data Analysis Services & Resources</h2>
              <Link to="/marketplace?category=Data Analysis" className="text-amber-600 font-medium hover:text-amber-700">View in Marketplace &rarr;</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
               {dataProducts.map(product => (
                 <div key={product.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm group">
                    <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                       <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-6">
                       <div className="text-xs font-semibold text-amber-600 uppercase mb-2">{product.category}</div>
                       <h3 className="text-lg font-medium text-gray-900 mb-2 truncate">{product.name}</h3>
                       <div className="flex justify-between items-center mt-4">
                          <span className="text-xl font-semibold text-gray-900">₦{product.price.toLocaleString()}</span>
                          <Link to="/marketplace" className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">Order Now</Link>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* Data Analysis Projects */}
        <div>
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl font-semibold tracking-tight">Recent Data Projects</h2>
            <Link to="/portfolio" className="text-amber-600 font-medium hover:text-amber-700">View Full Portfolio &rarr;</Link>
          </div>
          {dataProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {dataProjects.map(item => (
                 <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm group cursor-pointer block">
                    <div className="aspect-video bg-gray-100 overflow-hidden relative">
                       <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-6 md:p-8">
                       <h3 className="text-2xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                       <p className="text-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                 </div>
               ))}
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] border border-gray-100 p-12 text-center">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-gray-400" />
               </div>
               <h3 className="text-xl font-medium text-gray-900 mb-2">Projects Coming Soon</h3>
               <p className="text-gray-500">I'm currently curating my data analysis portfolio. Check back later to see my latest work.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
