import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Trophy,
  Search,
  Plus,
  Eye,
  Settings,
  Crown,
  Target,
  Heart,
  BookOpen
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Clubs', icon: '🌟' },
  { id: 'problem-solving', label: 'Problem Solving', icon: '🔧' },
  { id: 'hobby', label: 'Hobby Based', icon: '🎨' }
];

const problemSolvingClubs = [
  {
    id: 'climate-action', name: 'Climate Action Network', description: 'Building solutions for environmental challenges', members: 2847, projects: 23, location: 'Global', category: 'problem-solving', tags: ['Environment', 'Sustainability', 'Innovation'], image: 'Environmental activists working on climate change solutions with renewable energy models', topContributor: 'Emma Green', recentActivity: 'New project: Carbon Footprint Tracker',
  },
  {
    id: 'mental-health', name: 'Mental Health Advocates', description: 'Creating awareness and support systems for mental wellness', members: 1923, projects: 18, location: 'Worldwide', category: 'problem-solving', tags: ['Mental Health', 'Support', 'Awareness'], image: 'Mental health support group meeting with diverse young people in circle', topContributor: 'Sarah Kim', recentActivity: 'Launched peer support chatbot',
  },
  {
    id: 'ai-ethics', name: 'AI Ethics Coalition', description: 'Ensuring responsible AI development and deployment', members: 1456, projects: 15, location: 'Remote', category: 'problem-solving', tags: ['AI', 'Ethics', 'Technology'], image: 'Tech ethicists discussing AI algorithms with diverse team around computer screens', topContributor: 'Dr. James Liu', recentActivity: 'Published AI bias detection framework',
  }
];

const hobbyClubs = [
  {
    id: 'gaming-guild', name: 'Gaming Guild', description: 'Competitive gaming, reviews, and community tournaments', members: 3421, projects: 31, location: 'Online', category: 'hobby', tags: ['Gaming', 'Esports', 'Reviews'], image: 'Gamers in esports tournament with multiple gaming setups and LED lighting', topContributor: 'GameMaster_X', recentActivity: 'Weekly tournament starting soon',
  },
  {
    id: 'creative-writers', name: 'Creative Writers Circle', description: 'Sharing stories, poetry, and collaborative writing projects', members: 1876, projects: 42, location: 'Global', category: 'hobby', tags: ['Writing', 'Poetry', 'Storytelling'], image: 'Writers workshop with diverse group sharing stories in cozy literary setting', topContributor: 'WordSmith_99', recentActivity: 'Monthly anthology published',
  },
  {
    id: 'cooking-masters', name: 'Cooking Masters', description: 'Recipe sharing, cooking challenges, and culinary adventures', members: 2234, projects: 28, location: 'Worldwide', category: 'hobby', tags: ['Cooking', 'Recipes', 'Food'], image: 'Diverse group cooking together in modern kitchen with fresh ingredients', topContributor: 'ChefInTraining', recentActivity: 'International cuisine challenge',
  }
];

const allClubs = [...problemSolvingClubs, ...hobbyClubs];

const ClubCard = ({ club, joinedClubs, toggleJoinClub }) => (
  <motion.div
    key={club.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: Math.random() * 0.2 }}
  >
    <Card className="glass-effect cyber-border hover:neon-glow transition-all group h-full">
      <div className="relative">
        <img  className="w-full h-48 object-cover rounded-t-lg" alt={club.name} src="https://images.unsplash.com/photo-1513661296-6b1502d89c3d" />
        <div className="absolute top-4 left-4">
          <Badge className={`${club.category === 'problem-solving' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
            {club.category === 'problem-solving' ? '🔧 Problem Solving' : '🎨 Hobby'}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Users className="w-4 h-4 text-white" />
          <span className="text-white text-sm">{club.members.toLocaleString()}</span>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-white text-lg mb-2">{club.name}</CardTitle>
        <CardDescription className="text-gray-300 text-sm leading-relaxed">{club.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div><div className="text-lg font-bold text-purple-400">{club.projects}</div><div className="text-xs text-gray-400">Projects</div></div>
          <div><div className="text-lg font-bold text-blue-400">{club.members.toLocaleString()}</div><div className="text-xs text-gray-400">Members</div></div>
          <div><div className="flex items-center justify-center"><MapPin className="w-4 h-4 text-green-400" /></div><div className="text-xs text-gray-400">{club.location}</div></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {club.tags.map((tag) => <Badge key={tag} variant="outline" className="text-purple-400 border-purple-400 text-xs">{tag}</Badge>)}
        </div>
        <div className="bg-gray-800/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /><span className="text-xs text-gray-400">Recent Activity</span></div>
          <p className="text-sm text-gray-300">{club.recentActivity}</p>
        </div>
        <div className="flex items-center space-x-2"><Crown className="w-4 h-4 text-yellow-400" /><span className="text-sm text-gray-400">Top Contributor:</span><span className="text-sm text-purple-400 font-semibold">{club.topContributor}</span></div>
        <div className="flex space-x-2">
          <Button onClick={() => toggleJoinClub(club.id)} className={`flex-1 ${joinedClubs.has(club.id) ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'}`}>
            {joinedClubs.has(club.id) ? <><Settings className="w-4 h-4 mr-2" />Manage</> : <><Plus className="w-4 h-4 mr-2" />Join Club</>}
          </Button>
          <Button variant="outline" size="icon" className="border-purple-500/30 text-purple-400"><Eye className="w-4 h-4" /></Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const ClubFeatureCard = ({ icon: Icon, title, description, color }) => (
  <Card className="glass-effect cyber-border text-center">
    <CardContent className="p-6">
      <Icon className={`w-12 h-12 text-${color}-400 mx-auto mb-4`} />
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </CardContent>
  </Card>
);

const ClubsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [joinedClubs, setJoinedClubs] = useState(new Set(['climate-action', 'ai-ethics']));

  const getFilteredClubs = () => {
    if (selectedCategory === 'all') return allClubs;
    if (selectedCategory === 'problem-solving') return problemSolvingClubs;
    if (selectedCategory === 'hobby') return hobbyClubs;
    return allClubs;
  };

  const toggleJoinClub = (clubId) => {
    setJoinedClubs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(clubId)) newSet.delete(clubId);
      else newSet.add(clubId);
      return newSet;
    });
  };

  return (
    <div className="min-h-screen py-8 px-4"> {/* Removed pt-16 */}
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Purpose Driven Clubs</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Join communities solving real problems or pursuing shared passions. Collaborate, contribute, and make an impact.</p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Search clubs by name, topic, or location..." className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400" />
            </div>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 px-6"><Plus className="w-4 h-4 mr-2" />Create Club</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button key={category.id} variant={selectedCategory === category.id ? "default" : "outline"} onClick={() => setSelectedCategory(category.id)}
                className={`${selectedCategory === category.id ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10'}`}>
                <span className="mr-2">{category.icon}</span>{category.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {getFilteredClubs().map((club) => <ClubCard key={club.id} club={club} joinedClubs={joinedClubs} toggleJoinClub={toggleJoinClub} />)}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Club Spotlight</h2>
          <Card className="glass-effect cyber-border neon-glow">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-3 mb-4"><Badge className="bg-green-600 text-white">🔧 Problem Solving</Badge><Badge className="bg-yellow-600 text-white"><Trophy className="w-3 h-3 mr-1" />Top Club This Month</Badge></div>
                  <h3 className="text-3xl font-bold text-white mb-4">Climate Action Network</h3>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">Our most active community is making real impact on climate change through innovative projects, policy advocacy, and grassroots action. Join 2,847 changemakers building a sustainable future.</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center"><div className="text-2xl font-bold text-green-400">23</div><div className="text-sm text-gray-400">Active Projects</div></div>
                    <div className="text-center"><div className="text-2xl font-bold text-blue-400">2,847</div><div className="text-sm text-gray-400">Members</div></div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3"><Target className="w-5 h-5 text-green-400" /><span className="text-gray-300">Carbon Footprint Tracker - 89% complete</span></div>
                    <div className="flex items-center space-x-3"><Heart className="w-5 h-5 text-red-400" /><span className="text-gray-300">Community Solar Initiative - Launched</span></div>
                    <div className="flex items-center space-x-3"><BookOpen className="w-5 h-5 text-purple-400" /><span className="text-gray-300">Climate Education Program - 500+ students</span></div>
                  </div>
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8">Join Climate Action Network</Button>
                </div>
                <div><img  className="w-full h-80 object-cover rounded-lg" alt="Climate Action Network spotlight" src="https://images.unsplash.com/photo-1697869162556-ab57db502c09" /></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Top Clubs This Month</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {allClubs.slice(0, 3).map((club, index) => (
              <Card key={club.id} className="glass-effect cyber-border">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-yellow-500 text-black' : index === 1 ? 'bg-gray-400 text-black' : 'bg-orange-500 text-black'}`}>{index + 1}</div>
                    <div><h3 className="font-bold text-white">{club.name}</h3><p className="text-sm text-gray-400">{club.members.toLocaleString()} members</p></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-gray-400">Activity Score</span><span className="text-purple-400 font-semibold">{(club.members * 0.1 + club.projects * 50).toFixed(0)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-gray-400">Projects Completed</span><span className="text-green-400 font-semibold">{club.projects}</span></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Club Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ClubFeatureCard icon={MessageCircle} title="Discussion Rooms" description="Threaded conversations, polls, and debates" color="purple" />
            <ClubFeatureCard icon={Target} title="Project Zones" description="Build and track collaborative initiatives" color="green" />
            <ClubFeatureCard icon={Calendar} title="Live Events" description="Club talks, panels, and open mic nights" color="blue" />
            <ClubFeatureCard icon={Eye} title="Anonymous Posts" description="Privacy controls and pseudonym options" color="yellow" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <Card className="glass-effect cyber-border neon-glow">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold gradient-text mb-6">Ready to Make an Impact?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Join thousands of changemakers and creators building the future together. Find your tribe, start projects, and create lasting change.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 text-lg"><Plus className="w-5 h-5 mr-2" />Create Your Club</Button>
                <Button variant="outline" className="border-purple-500/30 text-purple-400 px-8 py-3 text-lg"><Search className="w-5 h-5 mr-2" />Explore All Clubs</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ClubsPage;