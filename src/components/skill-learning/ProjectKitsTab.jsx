import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';

const projectKits = [
  { title: 'E-commerce App Design Kit', downloads: '3.2K', type: 'Figma Template', image: 'E-commerce mobile app design templates with shopping interface' },
  { title: 'SaaS Dashboard Components', downloads: '2.8K', type: 'React Components', image: 'Modern dashboard interface with charts and analytics components' },
  { title: 'Brand Identity Toolkit', downloads: '1.9K', type: 'Design Assets', image: 'Brand identity design elements including logos and color palettes' }
];

const ProjectKitsTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white">Downloadable Project Kits</h2>
      <Button variant="outline" className="border-purple-500 text-purple-400">
        Upload Your Kit
      </Button>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projectKits.map((kit, index) => (
        <motion.div
          key={kit.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="glass-effect cyber-border hover:neon-glow transition-all group cursor-pointer">
            <div className="relative">
              <img  className="w-full h-48 object-cover rounded-t-lg" alt={kit.title} src="https://images.unsplash.com/photo-1571155082915-9ef8263d5f50" />
              <Button className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
            <CardHeader>
              <CardTitle className="text-white text-lg">{kit.title}</CardTitle>
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-600 text-white">{kit.type}</Badge>
                <div className="flex items-center text-sm text-gray-400">
                  <Download className="w-4 h-4 mr-1" />
                  {kit.downloads}
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default ProjectKitsTab;