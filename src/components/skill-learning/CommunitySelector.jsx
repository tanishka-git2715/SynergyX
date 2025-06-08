import React from 'react';
import { motion } from 'framer-motion';

const CommunitySelector = ({ communities, selectedCommunity, setSelectedCommunity }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold text-white mb-6">Choose Your Community</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {communities.map((community) => (
        <motion.div
          key={community.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedCommunity(community.id)}
          className={`cursor-pointer rounded-xl p-4 text-center transition-all ${
            selectedCommunity === community.id
              ? 'glass-effect cyber-border neon-glow'
              : 'bg-gray-800/30 border border-gray-600 hover:border-purple-400'
          }`}
        >
          <div className="text-3xl mb-2">{community.icon}</div>
          <h3 className="font-bold text-white text-sm mb-1">{community.name}</h3>
          <p className="text-xs text-gray-400 mb-2">{community.members} members</p>
          <div className={`h-1 rounded-full bg-gradient-to-r ${community.color} opacity-60`} />
        </motion.div>
      ))}
    </div>
  </div>
);

export default CommunitySelector;