import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const skillCategories = [
  'Design', 'AI/ML', 'Finance', 'Web Dev', 'Mobile Dev', 'Data Science',
  'Marketing', 'Writing', 'Photography', 'Video Editing', 'Music Production',
  'Business', 'Entrepreneurship', 'Public Speaking', 'Leadership'
];

const clubTypes = [
  'Climate Change', 'Mental Health', 'AI Ethics', 'Social Justice',
  'Gaming', 'Writing', 'Cooking', 'Books', 'Fitness', 'Travel',
  'Photography', 'Music', 'Art', 'Tech Innovation', 'Startups'
];

const WaitlistFormStep3 = ({ formData, handleInputChange, handleArrayToggle }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="space-y-8"
  >
    <div>
      <Label className="text-white text-lg font-semibold mb-4 block">What skills interest you?</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {skillCategories.map((skill) => (
          <Badge
            key={skill}
            onClick={() => handleArrayToggle('skills', skill)}
            className={`cursor-pointer p-3 text-center transition-all ${
              formData.skills.includes(skill)
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>

    <div>
      <Label className="text-white text-lg font-semibold mb-4 block">Which clubs would you join?</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {clubTypes.map((club) => (
          <Badge
            key={club}
            onClick={() => handleArrayToggle('clubs', club)}
            className={`cursor-pointer p-3 text-center transition-all ${
              formData.clubs.includes(club)
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            {club}
          </Badge>
        ))}
      </div>
    </div>

    <div>
      <Label htmlFor="goals" className="text-white text-lg font-semibold">What are your main goals?</Label>
      <textarea
        id="goals"
        value={formData.goals}
        onChange={(e) => handleInputChange('goals', e.target.value)}
        placeholder="Tell us what you want to achieve..."
        className="mt-2 w-full p-4 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 min-h-[100px] resize-none"
      />
    </div>
  </motion.div>
);

export default WaitlistFormStep3;