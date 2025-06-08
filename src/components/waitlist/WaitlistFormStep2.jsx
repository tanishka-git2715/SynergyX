import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { User, Briefcase, BookOpen, Users, MessageCircle } from 'lucide-react';

const roles = [
  { id: 'learner', label: 'Learner', icon: BookOpen, description: 'I want to develop new skills' },
  { id: 'employer', label: 'Employer', icon: Briefcase, description: 'I\'m looking to hire talent' },
  { id: 'mentor', label: 'Mentor', icon: MessageCircle, description: 'I want to guide others' },
  { id: 'partner', label: 'Partner', icon: Users, description: 'I want to collaborate' },
  { id: 'student', label: 'Student', icon: User, description: 'I\'m currently studying' }
];

const WaitlistFormStep2 = ({ formData, handleInputChange }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="space-y-6"
  >
    <div>
      <Label className="text-white text-lg font-semibold mb-4 block">What best describes you?</Label>
      <div className="grid md:grid-cols-2 gap-4">
        {roles.map((role) => (
          <motion.div
            key={role.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleInputChange('role', role.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.role === role.id
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-gray-600 bg-gray-800/30 hover:border-purple-400'
            }`}
          >
            <div className="flex items-center space-x-3">
              <role.icon className={`w-6 h-6 ${formData.role === role.id ? 'text-purple-400' : 'text-gray-400'}`} />
              <div>
                <div className={`font-semibold ${formData.role === role.id ? 'text-purple-400' : 'text-white'}`}>
                  {role.label}
                </div>
                <div className="text-sm text-gray-400">{role.description}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default WaitlistFormStep2;