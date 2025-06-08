import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Star, Users, Play, Clock } from 'lucide-react';

const learningResources = [
  { title: 'Complete UI/UX Design Bootcamp', type: 'Course', rating: 4.9, students: '2.3K', duration: '12 weeks', level: 'Beginner', image: 'Modern UI/UX design course with colorful interface mockups' },
  { title: 'Figma to Code Masterclass', type: 'Workshop', rating: 4.8, students: '1.8K', duration: '6 hours', level: 'Intermediate', image: 'Figma interface with code editor showing design to development workflow' },
  { title: 'Design System Fundamentals', type: 'Course', rating: 4.7, students: '1.2K', duration: '8 weeks', level: 'Advanced', image: 'Design system components and style guide documentation' }
];

const LearningResourcesTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white">Top-Rated Learning Resources</h2>
      <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
        <Bot className="w-4 h-4 mr-2" />
        AI Recommendations
      </Button>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {learningResources.map((resource, index) => (
        <motion.div
          key={resource.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="glass-effect cyber-border hover:neon-glow transition-all group cursor-pointer">
            <div className="relative">
              <img  className="w-full h-48 object-cover rounded-t-lg" alt={resource.title} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-purple-600 text-white">{resource.type}</Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                  {resource.level}
                </Badge>
              </div>
              <Button className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm">
                <Play className="w-4 h-4" />
              </Button>
            </div>
            <CardHeader>
              <CardTitle className="text-white text-lg">{resource.title}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  {resource.rating}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {resource.students}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {resource.duration}
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default LearningResourcesTab;