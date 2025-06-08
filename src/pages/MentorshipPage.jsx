import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Star, Clock, Calendar, MessageCircle, Award, BookOpen, Target, Search, Plus, CheckCircle, User
} from 'lucide-react';

const skillCategories = [
  { id: 'all', label: 'All Skills', icon: '🌟' }, { id: 'tech', label: 'Technology', icon: '💻' },
  { id: 'design', label: 'Design', icon: '🎨' }, { id: 'business', label: 'Business', icon: '💼' },
  { id: 'marketing', label: 'Marketing', icon: '📈' }, { id: 'career', label: 'Career', icon: '🚀' }
];

const mentorsData = [
  { id: 'sarah-chen', name: 'Sarah Chen', title: 'Senior AI Engineer at Google', expertise: ['AI/ML', 'Python', 'Career Growth'], rating: 4.9, reviews: 127, sessions: 450, responseTime: '< 2 hours', price: 80, availability: 'Available', bio: 'Helping aspiring AI engineers break into tech with 8+ years at top companies', image: 'Professional AI engineer Sarah Chen with diverse tech background and Google office', skills: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow', 'Career Mentoring'], languages: ['English', 'Mandarin'], timezone: 'PST', featured: true, category: 'tech' },
  { id: 'marcus-dev', name: 'Marcus Johnson', title: 'Full-Stack Developer & Startup Founder', expertise: ['Web Development', 'Startups', 'Leadership'], rating: 4.8, reviews: 89, sessions: 320, responseTime: '< 4 hours', price: 65, availability: 'Available', bio: 'Built 3 successful startups. Passionate about mentoring the next generation of entrepreneurs', image: 'Startup founder Marcus Johnson in modern office with development team', skills: ['React', 'Node.js', 'Entrepreneurship', 'Team Leadership', 'Product Strategy'], languages: ['English', 'Spanish'], timezone: 'EST', featured: false, category: 'tech' },
  { id: 'emma-design', name: 'Emma Rodriguez', title: 'Design Director at Airbnb', expertise: ['UX Design', 'Product Strategy', 'Design Systems'], rating: 4.9, reviews: 156, sessions: 380, responseTime: '< 3 hours', price: 90, availability: 'Limited', bio: 'Leading design teams at scale. Specializing in user-centered design and design leadership', image: 'UX Design Director Emma Rodriguez with design team and user experience prototypes', skills: ['UX/UI Design', 'Figma', 'Design Systems', 'User Research', 'Design Leadership'], languages: ['English', 'Spanish'], timezone: 'PST', featured: true, category: 'design' },
  { id: 'david-marketing', name: 'David Park', title: 'Growth Marketing Lead at Stripe', expertise: ['Growth Marketing', 'Analytics', 'Strategy'], rating: 4.7, reviews: 94, sessions: 280, responseTime: '< 6 hours', price: 70, availability: 'Available', bio: 'Scaled marketing at high-growth startups. Expert in data-driven growth strategies', image: 'Growth marketing expert David Park with analytics dashboards and marketing campaigns', skills: ['Growth Hacking', 'Google Analytics', 'A/B Testing', 'Content Strategy', 'SEO'], languages: ['English', 'Korean'], timezone: 'PST', featured: false, category: 'marketing' },
  { id: 'lisa-career', name: 'Lisa Wang', title: 'VP of People at Notion', expertise: ['Career Development', 'Leadership', 'HR Strategy'], rating: 4.8, reviews: 112, sessions: 340, responseTime: '< 4 hours', price: 75, availability: 'Available', bio: 'Helping professionals navigate career transitions and develop leadership skills', image: 'HR executive Lisa Wang in professional setting with diverse team members', skills: ['Career Coaching', 'Leadership Development', 'Interview Prep', 'Salary Negotiation'], languages: ['English', 'Mandarin'], timezone: 'PST', featured: false, category: 'career' },
  { id: 'alex-business', name: 'Alex Thompson', title: 'Business Strategy Consultant', expertise: ['Business Strategy', 'Operations', 'Finance'], rating: 4.6, reviews: 78, sessions: 210, responseTime: '< 8 hours', price: 85, availability: 'Available', bio: 'Former McKinsey consultant helping startups and individuals with strategic thinking', image: 'Business consultant Alex Thompson with strategic planning materials and corporate setting', skills: ['Strategic Planning', 'Financial Modeling', 'Operations', 'Market Analysis'], languages: ['English', 'French'], timezone: 'EST', featured: false, category: 'business' }
];

const mentorshipTypes = [
  { type: '1:1 Sessions', description: 'Personalized one-on-one mentoring sessions', duration: '30-60 minutes', price: '$50-100', features: ['Personalized guidance', 'Direct feedback', 'Flexible scheduling', 'Follow-up support'], icon: User, color: 'purple' },
  { type: 'Group Mentoring', description: 'Small group sessions with peer learning', duration: '60-90 minutes', price: '$25-50', features: ['Peer learning', 'Cost effective', 'Diverse perspectives', 'Networking'], icon: Users, color: 'blue' }
];

const MentorCard = ({ mentor, bookedSessions, toggleBooking, isFeatured }) => (
  <Card className={`glass-effect cyber-border ${isFeatured ? 'neon-glow' : 'hover:neon-glow'} transition-all group h-full`}>
    {isFeatured ? (
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="relative">
          <img  className="w-full h-80 object-cover rounded-l-lg" alt={mentor.name} src="https://images.unsplash.com/photo-1534298435681-3fd5153b0b7c" />
          <div className="absolute top-4 left-4"><Badge className="bg-yellow-600 text-white"><Star className="w-3 h-3 mr-1" />Featured</Badge></div>
          <div className="absolute top-4 right-4"><Badge className={`${mentor.availability === 'Available' ? 'bg-green-600' : 'bg-orange-600'} text-white`}>{mentor.availability}</Badge></div>
        </div>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-3"><h3 className="text-2xl font-bold text-white">{mentor.name}</h3><div className="flex items-center space-x-1"><Star className="w-4 h-4 text-yellow-400 fill-current" /><span className="text-yellow-400 font-semibold">{mentor.rating}</span><span className="text-gray-400 text-sm">({mentor.reviews})</span></div></div>
          <p className="text-purple-400 font-semibold mb-3">{mentor.title}</p><p className="text-gray-300 text-sm mb-4">{mentor.bio}</p>
          <div className="grid grid-cols-2 gap-4 mb-4"><div><div className="text-sm text-gray-400">Sessions</div><div className="text-white font-semibold">{mentor.sessions}</div></div><div><div className="text-sm text-gray-400">Response Time</div><div className="text-green-400 font-semibold">{mentor.responseTime}</div></div></div>
          <div className="flex flex-wrap gap-2 mb-4">{mentor.expertise.slice(0, 3).map((skill) => <Badge key={skill} variant="outline" className="text-purple-400 border-purple-400 text-xs">{skill}</Badge>)}</div>
          <div className="flex items-center justify-between mb-4"><div className="text-2xl font-bold text-green-400">${mentor.price}/hour</div><div className="text-sm text-gray-400">{mentor.timezone}</div></div>
          <Button onClick={() => toggleBooking(mentor.id)} className={`w-full ${bookedSessions.has(mentor.id) ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'}`}>{bookedSessions.has(mentor.id) ? <><CheckCircle className="w-4 h-4 mr-2" />Session Booked</> : <><Calendar className="w-4 h-4 mr-2" />Book Session</>}</Button>
        </CardContent>
      </div>
    ) : (
      <>
        <div className="relative"><img  className="w-full h-48 object-cover rounded-t-lg" alt={mentor.name} src="https://images.unsplash.com/photo-1534298435681-3fd5153b0b7c" /><div className="absolute top-4 right-4"><Badge className={`${mentor.availability === 'Available' ? 'bg-green-600' : 'bg-orange-600'} text-white`}>{mentor.availability}</Badge></div></div>
        <CardHeader><div className="flex items-center justify-between"><CardTitle className="text-white text-lg">{mentor.name}</CardTitle><div className="flex items-center space-x-1"><Star className="w-4 h-4 text-yellow-400 fill-current" /><span className="text-yellow-400 font-semibold text-sm">{mentor.rating}</span></div></div><CardDescription className="text-purple-400 font-semibold">{mentor.title}</CardDescription></CardHeader>
        <CardContent className="space-y-4"><p className="text-gray-300 text-sm">{mentor.bio}</p>
          <div className="grid grid-cols-3 gap-2 text-center"><div><div className="text-lg font-bold text-purple-400">{mentor.sessions}</div><div className="text-xs text-gray-400">Sessions</div></div><div><div className="text-lg font-bold text-blue-400">{mentor.reviews}</div><div className="text-xs text-gray-400">Reviews</div></div><div><div className="text-lg font-bold text-green-400">${mentor.price}</div><div className="text-xs text-gray-400">Per Hour</div></div></div>
          <div className="flex flex-wrap gap-2">{mentor.expertise.map((skill) => <Badge key={skill} variant="outline" className="text-purple-400 border-purple-400 text-xs">{skill}</Badge>)}</div>
          <div className="flex items-center space-x-2"><Clock className="w-4 h-4 text-green-400" /><span className="text-sm text-gray-300">Responds {mentor.responseTime}</span></div>
          <div className="flex space-x-2"><Button onClick={() => toggleBooking(mentor.id)} className={`flex-1 ${bookedSessions.has(mentor.id) ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'}`}>{bookedSessions.has(mentor.id) ? <><CheckCircle className="w-4 h-4 mr-2" />Booked</> : <><Calendar className="w-4 h-4 mr-2" />Book</>}</Button><Button variant="outline" size="icon" className="border-purple-500/30 text-purple-400"><MessageCircle className="w-4 h-4" /></Button></div>
        </CardContent>
      </>
    )}
  </Card>
);

const MentorshipBenefitCard = ({ icon: Icon, title, description, color }) => (
  <Card className="glass-effect cyber-border text-center">
    <CardContent className="p-6">
      <Icon className={`w-12 h-12 text-${color}-400 mx-auto mb-4`} />
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </CardContent>
  </Card>
);

const MentorshipPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [bookedSessions, setBookedSessions] = useState(new Set(['sarah-chen', 'marcus-dev']));

  const getFilteredMentors = () => selectedFilter === 'all' ? mentorsData : mentorsData.filter(mentor => mentor.category === selectedFilter);
  const toggleBooking = (mentorId) => setBookedSessions(prev => { const newSet = new Set(prev); if (newSet.has(mentorId)) newSet.delete(mentorId); else newSet.add(mentorId); return newSet; });

  return (
    <div className="min-h-screen py-8 px-4"> {/* Removed pt-16 */}
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Mentorship Sessions</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Connect with industry experts for personalized guidance. Book 1:1 sessions or join group mentoring circles.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Mentorship Options</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {mentorshipTypes.map((type) => (
              <Card key={type.type} className="glass-effect cyber-border hover:neon-glow transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6"><div className={`w-12 h-12 rounded-full bg-gradient-to-r ${type.color === 'purple' ? 'from-purple-600 to-blue-600' : 'from-blue-600 to-cyan-600'} flex items-center justify-center`}><type.icon className="w-6 h-6 text-white" /></div><div><h3 className="text-2xl font-bold text-white">{type.type}</h3><p className="text-gray-400">{type.description}</p></div></div>
                  <div className="grid grid-cols-2 gap-4 mb-6"><div><div className="text-sm text-gray-400">Duration</div><div className="text-white font-semibold">{type.duration}</div></div><div><div className="text-sm text-gray-400">Price Range</div><div className="text-green-400 font-semibold">{type.price}</div></div></div>
                  <div className="space-y-2 mb-6">{type.features.map((feature) => <div key={feature} className="flex items-center space-x-2"><CheckCircle className="w-4 h-4 text-green-400" /><span className="text-gray-300 text-sm">{feature}</span></div>)}</div>
                  <Button className={`w-full bg-gradient-to-r ${type.color === 'purple' ? 'from-purple-600 to-blue-600' : 'from-blue-600 to-cyan-600'} text-white`}>{type.type === '1:1 Sessions' ? 'Book 1:1 Session' : 'Join Group Session'}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /><input type="text" placeholder="Search mentors by name, skill, or company..." className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400" /></div>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 px-6"><Plus className="w-4 h-4 mr-2" />Become a Mentor</Button>
          </div>
          <div className="flex flex-wrap gap-3">{skillCategories.map((category) => <Button key={category.id} variant={selectedFilter === category.id ? "default" : "outline"} onClick={() => setSelectedFilter(category.id)} className={`${selectedFilter === category.id ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10'}`}><span className="mr-2">{category.icon}</span>{category.label}</Button>)}</div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Featured Mentors</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">{getFilteredMentors().filter(m => m.featured).map((mentor) => <MentorCard key={mentor.id} mentor={mentor} bookedSessions={bookedSessions} toggleBooking={toggleBooking} isFeatured={true} />)}</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">All Mentors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{getFilteredMentors().filter(m => !m.featured).map((mentor) => <MentorCard key={mentor.id} mentor={mentor} bookedSessions={bookedSessions} toggleBooking={toggleBooking} isFeatured={false} />)}</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Why Choose SynergyX Mentorship?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MentorshipBenefitCard icon={Award} title="Verified Experts" description="All mentors are verified industry professionals" color="yellow" />
            <MentorshipBenefitCard icon={Target} title="Personalized Guidance" description="Tailored advice for your specific goals" color="green" />
            <MentorshipBenefitCard icon={BookOpen} title="Skill Development" description="Accelerate your learning with expert insights" color="blue" />
            <MentorshipBenefitCard icon={Users} title="Community Support" description="Connect with peers and build your network" color="purple" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <Card className="glass-effect cyber-border neon-glow"><CardContent className="p-12"><h2 className="text-4xl font-bold gradient-text mb-6">Ready to Accelerate Your Growth?</h2><p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Connect with industry experts who've been where you want to go. Get personalized guidance, actionable insights, and accelerate your career.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 text-lg"><Calendar className="w-5 h-5 mr-2" />Book Your First Session</Button><Button variant="outline" className="border-purple-500/30 texttext-purple-400 px-8 py-3 text-lg"><Plus className="w-5 h-5 mr-2" />Become a Mentor</Button></div></CardContent></Card>
        </motion.div>
      </div>
    </div>
  );
};

export default MentorshipPage;