import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const WaitlistFormStep1 = ({ formData, handleInputChange }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="space-y-6"
  >
    <div>
      <Label htmlFor="name" className="text-white text-lg font-semibold">What's your name?</Label>
      <Input
        id="name"
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        placeholder="Enter your full name"
        className="mt-2 bg-gray-800/50 border-purple-500/30 text-white placeholder-gray-400 text-lg p-4"
      />
    </div>
    <div>
      <Label htmlFor="email" className="text-white text-lg font-semibold">Email address</Label>
      <Input
        id="email"
        type="email"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        placeholder="your@email.com"
        className="mt-2 bg-gray-800/50 border-purple-500/30 text-white placeholder-gray-400 text-lg p-4"
      />
    </div>
  </motion.div>
);

export default WaitlistFormStep1;