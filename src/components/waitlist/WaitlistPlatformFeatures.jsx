import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, BookOpen, Briefcase, Users } from 'lucide-react';

const iconMap = {
  'BookOpen': BookOpen,
  'Briefcase': Briefcase,
  'Users': Users
};

const WaitlistPlatformFeatures = ({ platforms }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold gradient-text">What You'll Get Access To</h2>
    <div className="space-y-4">
      {platforms.map((platform, index) => {
        const IconComponent = iconMap[platform.icon] || Users;
        
        return (
          <motion.div
            key={platform.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-lg p-6 cyber-border"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">{platform.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{platform.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {platform.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

export default WaitlistPlatformFeatures;