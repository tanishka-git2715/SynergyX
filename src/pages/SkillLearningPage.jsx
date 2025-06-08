import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LearningResourcesTab from '@/components/skill-learning/LearningResourcesTab';
import ProjectKitsTab from '@/components/skill-learning/ProjectKitsTab';
import MentorshipTab from '@/components/skill-learning/MentorshipTab';
import SkillQuestsTab from '@/components/skill-learning/SkillQuestsTab';
import CareerRoadmapTab from '@/components/skill-learning/CareerRoadmapTab';
import CommunitySelector from '@/components/skill-learning/CommunitySelector';

const communities = [
  { id: 'design', name: 'Design', icon: '🎨', members: '12.5K', color: 'from-pink-500 to-purple-500', description: 'UI/UX, Graphic Design, and Creative Arts' },
  { id: 'ai', name: 'AI & ML', icon: '🤖', members: '8.3K', color: 'from-blue-500 to-cyan-500', description: 'Machine Learning, AI Tools, and Data Science' },
  { id: 'webdev', name: 'Web Dev', icon: '💻', members: '15.2K', color: 'from-green-500 to-emerald-500', description: 'Frontend, Backend, and Full-Stack Development' },
  { id: 'finance', name: 'Finance', icon: '💰', members: '6.7K', color: 'from-yellow-500 to-orange-500', description: 'Trading, Investment, and Financial Analysis' },
  { id: 'marketing', name: 'Marketing', icon: '📈', members: '9.1K', color: 'from-red-500 to-pink-500', description: 'Digital Marketing, Growth, and Brand Strategy' },
  { id: 'mobile', name: 'Mobile Dev', icon: '📱', members: '7.8K', color: 'from-indigo-500 to-purple-500', description: 'iOS, Android, and Cross-Platform Development' }
];

const SkillLearningPage = () => {
  const [selectedCommunity, setSelectedCommunity] = useState('design');

  return (
    <div className="min-h-screen py-8 px-4"> {/* Removed pt-16 */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Skill-Based Learning Communities
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join vibrant communities, access top resources, and level up with AI-powered guidance and peer collaboration.
          </p>
        </motion.div>

        <CommunitySelector 
          communities={communities} 
          selectedCommunity={selectedCommunity} 
          setSelectedCommunity={setSelectedCommunity} 
        />

        <Tabs defaultValue="resources" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-gray-800/50">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="projects">Project Kits</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
            <TabsTrigger value="quests">Skill Quests</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          </TabsList>

          <LearningResourcesTab />
          <ProjectKitsTab />
          <MentorshipTab />
          <SkillQuestsTab />
          <CareerRoadmapTab />
        </Tabs>
      </div>
    </div>
  );
};

export default SkillLearningPage;