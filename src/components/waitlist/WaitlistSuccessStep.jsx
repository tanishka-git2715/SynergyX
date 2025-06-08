import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';

const WaitlistSuccessStep = ({ formData }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center space-y-8"
  >
    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
      <CheckCircle className="w-10 h-10 text-white" />
    </div>
    <div>
      <h2 className="text-3xl font-bold gradient-text mb-4">You're In! 🎉</h2>
      <p className="text-xl text-gray-300">
        Welcome to the SynergyX community, {formData.name}!
      </p>
      <p className="text-gray-400 mt-2">
        We'll send early access details to {formData.email}
      </p>
    </div>
    <div className="glass-effect rounded-xl p-6 cyber-border">
      <h3 className="text-xl font-bold text-white mb-4">What's Next?</h3>
      <div className="space-y-3 text-left">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span className="text-gray-300">Get notified when we launch</span>
        </div>
        <div className="flex items-center space-x-3">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <span className="text-gray-300">Early access to all features</span>
        </div>
        <div className="flex items-center space-x-3">
          <Sparkles className="w-5 h-5 text-green-400" />
          <span className="text-gray-300">Founding member benefits</span>
        </div>
      </div>
    </div>
  </motion.div>
);

export default WaitlistSuccessStep;