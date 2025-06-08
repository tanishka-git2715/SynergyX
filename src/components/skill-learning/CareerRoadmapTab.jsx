import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const careerRoadmapStages = [
  { level: 'Beginner', title: 'Design Fundamentals', skills: ['Color Theory', 'Typography', 'Layout Principles'], duration: '2-3 months' },
  { level: 'Intermediate', title: 'Tool Mastery', skills: ['Figma Advanced', 'Prototyping', 'Design Systems'], duration: '3-4 months' },
  { level: 'Advanced', title: 'Specialization', skills: ['UX Research', 'Product Strategy', 'Leadership'], duration: '6+ months' }
];

const CareerRoadmapTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
    <h2 className="text-2xl font-bold text-white">Design Career Roadmap</h2>
    
    <div className="space-y-8">
      {careerRoadmapStages.map((stage, index) => (
        <motion.div
          key={stage.level}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative"
        >
          <Card className="glass-effect cyber-border">
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                      <p className="text-purple-400">{stage.level} Level</p>
                    </div>
                    <Badge variant="outline" className="text-gray-400 border-gray-400">
                      {stage.duration}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {stage.skills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                        <span className="text-gray-300 text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {index < careerRoadmapStages.length - 1 && (
            <div className="absolute left-6 top-full w-0.5 h-8 bg-gradient-to-b from-purple-500 to-blue-500" />
          )}
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default CareerRoadmapTab;