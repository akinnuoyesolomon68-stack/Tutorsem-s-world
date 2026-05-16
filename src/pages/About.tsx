import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

export const About = () => {
  const { siteContent } = useAppContext();

  return (
    <div className="w-full relative">
      <div className="pt-20 pb-32 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-gray-900 mb-8">
              About TUTORSEM
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light mb-16">
              {siteContent.aboutIntro}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold tracking-tight mb-6">Story & Journey</h2>
              <div className="prose prose-gray">
                <p className="text-gray-600 leading-relaxed mb-4">
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
              <h2 className="text-2xl font-semibold tracking-tight mb-6">Skills & Expertise</h2>
              <div className="space-y-4">
                {[
                  { name: 'UI/UX Design', level: 'Expert' },
                  { name: 'Frontend Development', level: 'Advanced' },
                  { name: 'Branding & Graphics', level: 'Expert' },
                  { name: 'E-commerce Management', level: 'Advanced' },
                ].map((skill, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <span className="font-medium text-gray-900">{skill.name}</span>
                    <span className="text-sm text-teal-600 font-medium tracking-wide bg-teal-50 px-3 py-1 rounded-full">{skill.level}</span>
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
