import React from 'react';
import { motion } from 'framer-motion';
import { Target, Globe, Award, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const VisionGoals = () => {
  const { siteContent } = useAppContext();

  const goals = [
    { title: 'Deliver Quality Products', text: 'Curate and provide high-standard accessories, clothing, and materials.', icon: Award },
    { title: 'Showcase Innovation', text: 'Continuously push the boundaries of design through creative projects.', icon: Sparkles },
    { title: 'Empower Students', text: 'Provide accessible and useful academic resources and materials.', icon: Target },
    { title: 'Expand Globally', text: 'Build a trusted brand that reaches customers worldwide.', icon: Globe },
  ];

  return (
    <div className="w-full bg-white min-h-screen pt-20 pb-32 px-6 md:px-12 relative overflow-hidden">
      {/* Soft Background Pattern/Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-amber-50 rounded-full blur-[150px] opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-orange-50 rounded-full blur-[100px] opacity-60"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-semibold tracking-tighter text-gray-900 mb-8"
          >
            Vision & Goals
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-amber-800 font-medium leading-relaxed bg-amber-100/50 backdrop-blur-sm inline-block px-8 py-4 rounded-3xl"
          >
            "{siteContent.visionText}"
          </motion.p>
        </div>

        {/* Inspiring Growth Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24 rounded-[3rem] overflow-hidden aspect-[21/9] bg-gray-100 relative shadow-2xl"
        >
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop" alt="Growth and Success" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex items-end">
             <div className="p-8 md:p-12 text-white">
                <p className="text-sm font-semibold tracking-widest text-amber-400 uppercase mb-2">Our Trajectory</p>
                <h2 className="text-3xl md:text-4xl font-bold">Building a Lasting Empire</h2>
             </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {goals.map((goal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-gray-100 flex items-start space-x-6 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/5 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                <goal.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 tracking-tight group-hover:text-amber-600 transition-colors">{goal.title}</h3>
                <p className="text-gray-500 leading-relaxed">{goal.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
