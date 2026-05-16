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
    <div className="w-full bg-gray-50 min-h-screen pt-20 pb-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20 max-w-3xl mx-auto">
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
            className="text-xl text-teal-700 font-medium leading-relaxed bg-teal-50 inline-block px-6 py-3 rounded-2xl"
          >
            "{siteContent.visionText}"
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {goals.map((goal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 flex items-start space-x-6 hover:border-teal-100 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300"
            >
              <div className="p-4 bg-gray-50 text-gray-900 rounded-2xl">
                <goal.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 tracking-tight">{goal.title}</h3>
                <p className="text-gray-500 leading-relaxed">{goal.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
