import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Star,
  Filter,
  Search,
  Heart,
  MessageCircle,
  Share2,
  Building,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';

const jobTypes = [
  { id: 'all', label: 'All Jobs', count: '2.3K' },
  { id: 'freelance', label: 'Freelance', count: '890' },
  { id: 'internship', label: 'Internships', count: '650' },
  { id: 'startup', label: 'Startup Hiring', count: '420' },
  { id: 'events', label: 'Event Staffing', count: '340' }
];

const jobs = [
  {
    id: 1,
    title: 'UI/UX Designer for SaaS Platform',
    company: 'TechFlow',
    type: 'freelance',
    location: 'Remote',
    duration: '3-4 months',
    budget: '$3,000 - $5,000',
    skills: ['Figma', 'UI Design', 'Prototyping'],
    description: 'Looking for a talented designer to revamp our SaaS dashboard...',
    postedBy: 'Sarah Chen',
    postedTime: '2 hours ago',
    applicants: 12,
    verified: true,
    image: 'Professional woman working on UI design with multiple screens'
  },
  {
    id: 2,
    title: 'Frontend Developer Internship',
    company: 'StartupX',
    type: 'internship',
    location: 'San Francisco, CA',
    duration: '6 months',
    budget: '$2,000/month',
    skills: ['React', 'TypeScript', 'Tailwind'],
    description: 'Join our fast-growing startup as a frontend development intern...',
    postedBy: 'Alex Rodriguez',
    postedTime: '5 hours ago',
    applicants: 28,
    verified: true,
    image: 'Young developer coding on laptop in modern startup office'
  },
  {
    id: 3,
    title: 'Social Media Manager',
    company: 'CreativeAgency',
    type: 'freelance',
    location: 'Remote',
    duration: '2-3 months',
    budget: '$1,500 - $2,500',
    skills: ['Social Media', 'Content Creation', 'Analytics'],
    description: 'Manage social media presence for multiple client brands...',
    postedBy: 'Maria Garcia',
    postedTime: '1 day ago',
    applicants: 19,
    verified: false,
    image: 'Creative workspace with social media content planning boards'
  },
  {
    id: 4,
    title: 'Event Photography Assistant',
    company: 'EventPro',
    type: 'events',
    location: 'New York, NY',
    duration: '1 day',
    budget: '$200/day',
    skills: ['Photography', 'Event Coverage', 'Editing'],
    description: 'Assist lead photographer at corporate events and conferences...',
    postedBy: 'David Kim',
    postedTime: '3 days ago',
    applicants: 7,
    verified: true,
    image: 'Photographer capturing moments at a professional event'
  }
];

const featuredProfiles = [
  {
    name: 'Emma Thompson',
    title: 'Full-Stack Developer',
    level: 'Level 15',
    skills: ['React', 'Node.js', 'Python'],
    projects: 23,
    rating: 4.9,
    image: 'Young female developer with multiple coding projects displayed'
  },
  {
    name: 'Marcus Johnson',
    title: 'Digital Marketer',
    level: 'Level 12',
    skills: ['SEO', 'PPC', 'Analytics'],
    projects: 18,
    rating: 4.8,
    image: 'Marketing professional analyzing campaign data on multiple screens'
  },
  {
    name: 'Zoe Chen',
    title: 'UI/UX Designer',
    level: 'Level 18',
    skills: ['Figma', 'User Research', 'Prototyping'],
    projects: 31,
    rating: 5.0,
    image: 'Designer working on user interface mockups with design tools'
  }
];

const JobCard = ({ job, likedJobs, toggleLike }) => (
  <motion.div
    key={job.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: job.id * 0.05 }}
  >
    <Card className="glass-effect cyber-border hover:neon-glow transition-all group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <img  className="w-12 h-12 rounded-lg object-cover" alt={job.company} src="https://images.unsplash.com/photo-1650986406312-bae49db2021c" />
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400 font-semibold">{job.company}</span>
                {job.verified && (
                  <Badge className="bg-green-600 text-white text-xs">Verified</Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleLike(job.id)}
              className={`${likedJobs.has(job.id) ? 'text-red-400' : 'text-gray-400'} hover:text-red-400`}
            >
              <Heart className={`w-5 h-5 ${likedJobs.has(job.id) ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400"><MapPin className="w-4 h-4" /><span>{job.location}</span></div>
          <div className="flex items-center space-x-2 text-sm text-gray-400"><Clock className="w-4 h-4" /><span>{job.duration}</span></div>
          <div className="flex items-center space-x-2 text-sm text-gray-400"><DollarSign className="w-4 h-4" /><span>{job.budget}</span></div>
          <div className="flex items-center space-x-2 text-sm text-gray-400"><Users className="w-4 h-4" /><span>{job.applicants} applied</span></div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.map((skill) => (
            <Badge key={skill} variant="outline" className="text-purple-400 border-purple-400">{skill}</Badge>
          ))}
        </div>
        <p className="text-gray-300 mb-4">{job.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>Posted by {job.postedBy}</span><span>•</span><span>{job.postedTime}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-400"><MessageCircle className="w-4 h-4 mr-2" />Message</Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">Quick Apply</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const SidebarCard = ({ title, icon: Icon, description, children }) => (
  <Card className="glass-effect cyber-border">
    <CardHeader>
      <CardTitle className="text-white flex items-center">
        <Icon className="w-5 h-5 mr-2 text-purple-400" />
        {title}
      </CardTitle>
      {description && <CardDescription className="text-gray-400">{description}</CardDescription>}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const WorkPlatformPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [likedJobs, setLikedJobs] = useState(new Set());

  const toggleLike = (jobId) => {
    setLikedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) newSet.delete(jobId);
      else newSet.add(jobId);
      return newSet;
    });
  };

  const filteredJobs = selectedFilter === 'all' 
    ? jobs 
    : jobs.filter(job => job.type === selectedFilter);

  return (
    <div className="min-h-screen py-8 px-4"> {/* Removed pt-16 */}
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Social Work Platform</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Discover opportunities through our social-style feed. Apply with your profile, connect with teams, and build your career.</p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Search jobs, skills, or companies..." className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400" />
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 px-6"><Filter className="w-4 h-4 mr-2" />Advanced Filters</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            {jobTypes.map((type) => (
              <Button key={type.id} variant={selectedFilter === type.id ? "default" : "outline"} onClick={() => setSelectedFilter(type.id)}
                className={`${selectedFilter === type.id ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10'}`}>
                {type.label} ({type.count})
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Job Feed</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-400"><TrendingUp className="w-4 h-4" /><span>AI-powered recommendations</span></div>
            </div>
            <div className="space-y-4">
              {filteredJobs.map((job) => <JobCard key={job.id} job={job} likedJobs={likedJobs} toggleLike={toggleLike} />)}
            </div>
          </div>

          <div className="space-y-6">
            <SidebarCard title="Featured Profiles" icon={Star} description="Top performers this week">
              <div className="space-y-4">
                {featuredProfiles.map((profile, index) => (
                  <motion.div key={profile.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-700/30 transition-colors cursor-pointer">
                    <img  className="w-10 h-10 rounded-full object-cover" alt={profile.name} src="https://images.unsplash.com/photo-1683071765673-ff92ff1645dc" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">{profile.name}</h4>
                      <p className="text-xs text-gray-400">{profile.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className="bg-purple-600 text-white text-xs">{profile.level}</Badge>
                        <div className="flex items-center text-xs text-gray-400"><Star className="w-3 h-3 text-yellow-400 mr-1" />{profile.rating}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </SidebarCard>
            <SidebarCard title="Your Stats" icon={Target}>
              <div className="space-y-4">
                <div className="flex justify-between items-center"><span className="text-gray-400">Profile Views</span><span className="text-white font-bold">127</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-400">Applications Sent</span><span className="text-white font-bold">8</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-400">Response Rate</span><span className="text-green-400 font-bold">75%</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-400">Success Score</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-700 rounded-full"><div className="w-12 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div></div>
                    <span className="text-purple-400 font-bold">85%</span>
                  </div>
                </div>
              </div>
            </SidebarCard>
            <SidebarCard title="Team Formation" icon={Users} description="Join or create project teams">
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"><Users className="w-4 h-4 mr-2" />Find Team Members</Button>
                <Button variant="outline" className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10"><Building className="w-4 h-4 mr-2" />Create New Team</Button>
              </div>
            </SidebarCard>
            <SidebarCard title="AI Recommendations" icon={Zap} description="Personalized job matches">
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <h4 className="text-sm font-semibold text-purple-400 mb-1">Perfect Match</h4>
                  <p className="text-xs text-gray-300">React Developer at TechCorp</p>
                  <div className="flex items-center mt-2">
                    <div className="flex-1 bg-gray-700 rounded-full h-1"><div className="w-5/6 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div></div>
                    <span className="text-xs text-purple-400 ml-2">95% match</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10">View All Recommendations</Button>
              </div>
            </SidebarCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkPlatformPage;