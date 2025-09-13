import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Briefcase, 
  Users, 
  Calendar, 
  MessageCircle, 
  Star, 
  Trophy, 
  Zap,
  ArrowRight,
  Play,
  Target,
  Rocket
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Skill-based Learning",
      description: "Access top resources & AI guidance.",
      color: "from-purple-500 to-pink-500",
      link: "/learn"
    },
    {
      icon: Briefcase,
      title: "Work Platform",
      description: "Discover gigs & internships easily.",
      color: "from-blue-500 to-cyan-500",
      link: "/work"
    },
    {
      icon: Users,
      title: "Purpose-driven Clubs",
      description: "Collaborate on projects & connect.",
      color: "from-green-500 to-emerald-500",
      link: "/clubs"
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Join hackathons & workshops.",
      color: "from-orange-500 to-red-500",
      link: "/events"
    },
    {
      icon: MessageCircle,
      title: "Mentorship sessions",
      description: "Get 1:1 guidance from experts.",
      color: "from-indigo-500 to-purple-500",
      link: "/mentorship"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Learners", icon: Users },
    { number: "500+", label: "Skill Communities", icon: BookOpen },
    { number: "2K+", label: "Job Opportunities", icon: Briefcase },
    { number: "100+", label: "Expert Mentors", icon: Star }
  ];

  return (
    <div className="min-h-screen"> {/* Removed pt-16 as it's handled by App.jsx main tag */}
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-sm font-semibold">
              The Future of Gen Z Learning & Work
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="gradient-text">Learn. Work.</span>
              <br />
              <span className="gradient-text">Collaborate.</span>
              <br />
              <span className="text-white">All in One Place.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join the ultimate Gen Z ecosystem where skill-based communities, social work feeds, 
              and purpose-driven clubs come together to accelerate your growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-4 text-lg neon-glow">
                  Join SynergyX <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-4 text-lg">
                <Play className="mr-2 w-5 h-5" /> Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute top-20 left-10 floating-animation">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20 blur-xl" />
        </div>
        <div className="absolute bottom-20 right-10 floating-animation" style={{ animationDelay: '2s' }}>
          <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 blur-xl" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="glass-effect rounded-xl p-6 cyber-border">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Your Complete Growth Ecosystem
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Five powerful platforms working together to accelerate your learning, 
              career, and personal development journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link to={feature.link}>
                  <Card className="glass-effect cyber-border h-full hover:neon-glow transition-all duration-300 cursor-pointer flex flex-col">
                    <CardHeader className="items-center text-center">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-white group-hover:gradient-text transition-all">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between items-center text-center">
                      <CardDescription className="text-gray-300 text-sm leading-relaxed mb-3">
                        {feature.description}
                      </CardDescription>
                      <div className="mt-auto flex items-center text-purple-400 group-hover:text-blue-400 transition-colors">
                        <span className="text-xs font-medium">Explore</span>
                        <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification Preview */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/10 to-blue-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Level Up Your Journey
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Earn XP, unlock badges, and climb leaderboards as you learn, work, and collaborate.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-xl p-6 cyber-border"
            >
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-yellow-400 mr-3" />
                <span className="text-xl font-bold text-white">XP System</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Level 12</span>
                  <span className="text-purple-400">2,450 / 3,000 XP</span>
                </div>
                <div className="xp-bar w-full">
                  <div className="w-4/5 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-effect rounded-xl p-6 cyber-border"
            >
              <div className="flex items-center mb-4">
                <Trophy className="w-8 h-8 text-purple-400 mr-3" />
                <span className="text-xl font-bold text-white">Achievements</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((badge) => (
                  <div key={badge} className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-effect rounded-xl p-6 cyber-border"
            >
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-green-400 mr-3" />
                <span className="text-xl font-bold text-white">Leaderboard</span>
              </div>
              <div className="space-y-2">
                {['You', 'Alex Chen', 'Sarah Kim'].map((name, index) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-purple-400 font-bold mr-3">#{index + 1}</span>
                      <span className="text-white">{name}</span>
                    </div>
                    <span className="text-gray-400">{2500 - index * 200} XP</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-effect rounded-2xl p-12 cyber-border"
          >
            <Rocket className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Ready to Transform Your Future?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of Gen Z learners, creators, and innovators who are already 
              building their dream careers on SynergyX.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-12 py-4 text-xl neon-glow">
                Get Early Access <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">SynergyX</span>
              </div>
              <p className="text-gray-400 text-sm">
                The Gen Z ecosystem for learning, working, and collaborating.
              </p>
            </div>
            
            <div>
              <span className="text-white font-semibold mb-4 block">Platform</span>
              <div className="space-y-2">
                <Link to="/learn" className="block text-gray-400 hover:text-white text-sm transition-colors">Learn</Link>
                <Link to="/work" className="block text-gray-400 hover:text-white text-sm transition-colors">Work</Link>
                <Link to="/clubs" className="block text-gray-400 hover:text-white text-sm transition-colors">Clubs</Link>
                <Link to="/events" className="block text-gray-400 hover:text-white text-sm transition-colors">Events</Link>
              </div>
            </div>
            
            <div>
              <span className="text-white font-semibold mb-4 block">Support</span>
              <div className="space-y-2">
                <span className="block text-gray-400 text-sm cursor-pointer hover:text-white transition-colors">Help Center</span>
                <span className="block text-gray-400 text-sm cursor-pointer hover:text-white transition-colors">Contact</span>
                <span className="block text-gray-400 text-sm cursor-pointer hover:text-white transition-colors">Community</span>
              </div>
            </div>
            
            <div>
              <span className="text-white font-semibold mb-4 block">Legal</span>
              <div className="space-y-2">
                <span className="block text-gray-400 text-sm cursor-pointer hover:text-white transition-colors">Terms</span>
                <span className="block text-gray-400 text-sm cursor-pointer hover:text-white transition-colors">Privacy</span>
                <span className="block text-gray-400 text-sm cursor-pointer hover:text-white transition-colors">Cookies</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 SynergyX. All rights reserved. Built for the next generation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;