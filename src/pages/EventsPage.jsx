import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, Clock, MapPin, Users, Star, Plus, Video, Mic, Trophy, Share2, Bell
} from 'lucide-react';

const eventTypes = [
  { id: 'all', label: 'All Events', icon: '🌟' }, { id: 'workshops', label: 'Workshops', icon: '🛠️' },
  { id: 'talks', label: 'Expert Talks', icon: '🎤' }, { id: 'hackathons', label: 'Hackathons', icon: '💻' },
  { id: 'challenges', label: 'Challenges', icon: '🏆' }, { id: 'networking', label: 'Networking', icon: '🤝' }
];

const upcomingEventsData = [
  { id: 'ai-workshop', title: 'AI Ethics Workshop: Building Responsible Systems', description: 'Learn to identify and mitigate bias in AI systems with industry experts', date: '2024-01-15', time: '2:00 PM EST', duration: '2 hours', type: 'workshops', format: 'Virtual', host: 'Dr. Sarah Chen', attendees: 234, maxAttendees: 500, tags: ['AI', 'Ethics', 'Technology'], image: 'AI ethics workshop with diverse participants discussing responsible technology development', club: 'AI Ethics Coalition', price: 'Free', featured: true },
  { id: 'climate-hackathon', title: 'Climate Solutions Hackathon 2024', description: '48-hour hackathon to build innovative solutions for climate change', date: '2024-01-20', time: '9:00 AM EST', duration: '48 hours', type: 'hackathons', format: 'Hybrid', host: 'Climate Action Network', attendees: 156, maxAttendees: 200, tags: ['Climate', 'Innovation', 'Sustainability'], image: 'Climate hackathon with teams working on environmental solutions and green technology', club: 'Climate Action Network', price: 'Free', prizes: '$10,000 in prizes' },
  { id: 'design-thinking', title: 'Design Thinking for Social Impact', description: 'Master human-centered design principles for solving social problems', date: '2024-01-18', time: '6:00 PM EST', duration: '90 minutes', type: 'workshops', format: 'Virtual', host: 'Emma Rodriguez', attendees: 89, maxAttendees: 150, tags: ['Design', 'Social Impact', 'UX'], image: 'Design thinking workshop with participants sketching user journey maps', club: 'Design Community', price: '$15' },
  { id: 'startup-pitch', title: 'Startup Pitch Night: Gen Z Founders', description: 'Young entrepreneurs pitch their innovative startups to investors', date: '2024-01-22', time: '7:00 PM EST', duration: '2.5 hours', type: 'networking', format: 'In-Person', location: 'San Francisco, CA', host: 'Venture Collective', attendees: 67, maxAttendees: 100, tags: ['Startups', 'Entrepreneurship', 'Networking'], image: 'Startup pitch event with young founders presenting to diverse investor panel', club: 'Entrepreneur Hub', price: '$25' },
  { id: 'mental-health-panel', title: 'Mental Health in Tech: Expert Panel', description: 'Industry leaders discuss mental wellness in high-pressure environments', date: '2024-01-25', time: '4:00 PM EST', duration: '75 minutes', type: 'talks', format: 'Virtual', host: 'Mental Health Advocates', attendees: 312, maxAttendees: 1000, tags: ['Mental Health', 'Tech', 'Wellness'], image: 'Mental health panel with diverse speakers discussing workplace wellness', club: 'Mental Health Advocates', price: 'Free' },
  { id: 'coding-challenge', title: 'Weekly Coding Challenge: Algorithms', description: 'Test your problem-solving skills with algorithmic challenges', date: '2024-01-17', time: '8:00 PM EST', duration: '2 hours', type: 'challenges', format: 'Virtual', host: 'CodeMasters', attendees: 445, maxAttendees: 1000, tags: ['Programming', 'Algorithms', 'Competition'], image: 'Coding challenge with programmers solving complex algorithms on multiple screens', club: 'Developer Community', price: 'Free', recurring: 'Weekly' }
];

const pastEventsData = [
  { id: 'blockchain-basics', title: 'Blockchain Fundamentals Workshop', description: 'Introduction to blockchain technology and cryptocurrency', date: '2024-01-10', attendees: 189, rating: 4.8, feedback: 'Excellent introduction to complex topics', image: 'Blockchain workshop with participants learning cryptocurrency fundamentals', host: 'Crypto Education Hub' },
  { id: 'sustainability-summit', title: 'Youth Sustainability Summit', description: 'Global summit on environmental action by young leaders', date: '2024-01-08', attendees: 567, rating: 4.9, feedback: 'Inspiring and actionable content', image: 'Youth sustainability summit with diverse young environmental leaders', host: 'Green Future Alliance' }
];

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const EventCard = ({ event, rsvpEvents, toggleRSVP }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.random() * 0.2 }}>
    <Card className="glass-effect cyber-border hover:neon-glow transition-all group h-full">
      <div className="relative">
        <img  className="w-full h-48 object-cover rounded-t-lg" alt={event.title} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
        <div className="absolute top-4 left-4 flex space-x-2">
          <Badge className={`${ event.type === 'workshops' ? 'bg-blue-600' : event.type === 'talks' ? 'bg-purple-600' : event.type === 'hackathons' ? 'bg-green-600' : event.type === 'challenges' ? 'bg-yellow-600' : 'bg-pink-600'} text-white`}>{event.type}</Badge>
          {event.recurring && <Badge className="bg-orange-600 text-white">{event.recurring}</Badge>}
        </div>
        <div className="absolute top-4 right-4"><Badge variant="outline" className="text-green-400 border-green-400 bg-black/50">{event.price}</Badge></div>
      </div>
      <CardHeader>
        <CardTitle className="text-white text-lg leading-tight">{event.title}</CardTitle>
        <CardDescription className="text-gray-300 text-sm">{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2"><Calendar className="w-4 h-4 text-purple-400" /><span className="text-sm text-gray-300">{formatDate(event.date)}</span></div>
          <div className="flex items-center space-x-2"><Clock className="w-4 h-4 text-blue-400" /><span className="text-sm text-gray-300">{event.time} • {event.duration}</span></div>
          <div className="flex items-center space-x-2"><Video className="w-4 h-4 text-green-400" /><span className="text-sm text-gray-300">{event.format}</span>{event.location && <><MapPin className="w-4 h-4 text-yellow-400 ml-2" /><span className="text-sm text-gray-300">{event.location}</span></>}</div>
        </div>
        <div className="flex items-center space-x-3 bg-gray-800/30 rounded-lg p-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center"><Mic className="w-4 h-4 text-white" /></div>
          <div><div className="text-sm font-semibold text-white">{event.host}</div><div className="text-xs text-gray-400">{event.club}</div></div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2"><span className="text-gray-400">Attendees</span><span className="text-purple-400">{event.attendees}/{event.maxAttendees}</span></div>
          <div className="w-full bg-gray-700 rounded-full h-2"><div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }} /></div>
        </div>
        <div className="flex flex-wrap gap-2">{event.tags.map((tag) => <Badge key={tag} variant="outline" className="text-purple-400 border-purple-400 text-xs">{tag}</Badge>)}</div>
        {event.prizes && <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-2 flex items-center space-x-2"><Trophy className="w-4 h-4 text-yellow-400" /><span className="text-sm text-yellow-400 font-semibold">{event.prizes}</span></div>}
        <div className="flex space-x-2">
          <Button onClick={() => toggleRSVP(event.id)} className={`flex-1 ${rsvpEvents.has(event.id) ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'}`}>
            {rsvpEvents.has(event.id) ? <><Bell className="w-4 h-4 mr-2" />RSVP'd</> : 'RSVP'}
          </Button>
          <Button variant="outline" size="icon" className="border-purple-500/30 text-purple-400"><Share2 className="w-4 h-4" /></Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const PastEventCard = ({ event }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.random() * 0.2 }}>
    <Card className="glass-effect cyber-border">
      <div className="flex">
        <img  className="w-32 h-32 object-cover rounded-l-lg" alt={event.title} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
        <CardContent className="flex-1 p-4">
          <h3 className="font-bold text-white mb-2">{event.title}</h3>
          <p className="text-gray-400 text-sm mb-3">{event.description}</p>
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1"><Calendar className="w-4 h-4 text-purple-400" /><span className="text-sm text-gray-300">{formatDate(event.date)}</span></div>
            <div className="flex items-center space-x-1"><Users className="w-4 h-4 text-blue-400" /><span className="text-sm text-gray-300">{event.attendees}</span></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1"><Star className="w-4 h-4 text-yellow-400" /><span className="text-sm text-yellow-400 font-semibold">{event.rating}</span></div>
            <span className="text-xs text-gray-400">"{event.feedback}"</span>
          </div>
        </CardContent>
      </div>
    </Card>
  </motion.div>
);

const EventsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [rsvpEvents, setRsvpEvents] = useState(new Set(['ai-workshop', 'climate-hackathon']));

  const getFilteredEvents = () => selectedFilter === 'all' ? upcomingEventsData : upcomingEventsData.filter(event => event.type === selectedFilter);
  const toggleRSVP = (eventId) => setRsvpEvents(prev => { const newSet = new Set(prev); if (newSet.has(eventId)) newSet.delete(eventId); else newSet.add(eventId); return newSet; });

  const featuredEvent = getFilteredEvents().find(event => event.featured);

  return (
    <div className="min-h-screen py-8 px-4"> {/* Removed pt-16 */}
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Events & Learning Challenges</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Join live workshops, expert talks, hackathons, and challenges. Learn, compete, and connect with the community.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[ {val:24, label:"This Week", color:"purple"}, {val:"1.2k", label:"Attendees", color:"blue"}, {val:"89%", label:"Satisfaction", color:"green"}, {val:"$50k", label:"In Prizes", color:"yellow"} ].map(stat => (
            <Card key={stat.label} className="glass-effect cyber-border text-center"><CardContent className="p-4"><div className={`text-2xl font-bold text-${stat.color}-400`}>{stat.val}</div><div className="text-sm text-gray-400">{stat.label}</div></CardContent></Card>
          ))}
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {eventTypes.map((type) => (
              <Button key={type.id} variant={selectedFilter === type.id ? "default" : "outline"} onClick={() => setSelectedFilter(type.id)} className={`${selectedFilter === type.id ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10'}`}><span className="mr-2">{type.icon}</span>{type.label}</Button>
            ))}
          </div>
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"><Plus className="w-4 h-4 mr-2" />Host Your Event</Button>
        </div>

        <Tabs defaultValue="upcoming" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/50"><TabsTrigger value="upcoming" className="data-[state=active]:bg-purple-600">Upcoming Events</TabsTrigger><TabsTrigger value="past" className="data-[state=active]:bg-purple-600">Past Events</TabsTrigger></TabsList>
          <TabsContent value="upcoming" className="space-y-6">
            {featuredEvent && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h2 className="text-2xl font-bold gradient-text mb-4">Featured Event</h2>
                <Card className="glass-effect cyber-border neon-glow">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="relative"><img  className="w-full h-80 object-cover rounded-l-lg" alt={featuredEvent.title} src="https://images.unsplash.com/photo-1509930854872-0f61005b282e" /><div className="absolute top-4 left-4"><Badge className="bg-yellow-600 text-white"><Star className="w-3 h-3 mr-1" />Featured</Badge></div></div>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-3"><Badge className="bg-purple-600 text-white">{featuredEvent.type}</Badge><Badge variant="outline" className="text-green-400 border-green-400">{featuredEvent.price}</Badge></div>
                      <h3 className="text-2xl font-bold text-white mb-3">{featuredEvent.title}</h3><p className="text-gray-300 mb-4">{featuredEvent.description}</p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center space-x-2"><Calendar className="w-4 h-4 text-purple-400" /><span className="text-sm text-gray-300">{formatDate(featuredEvent.date)}</span></div>
                        <div className="flex items-center space-x-2"><Clock className="w-4 h-4 text-blue-400" /><span className="text-sm text-gray-300">{featuredEvent.time}</span></div>
                        <div className="flex items-center space-x-2"><Users className="w-4 h-4 text-green-400" /><span className="text-sm text-gray-300">{featuredEvent.attendees}/{featuredEvent.maxAttendees}</span></div>
                        <div className="flex items-center space-x-2"><Video className="w-4 h-4 text-yellow-400" /><span className="text-sm text-gray-300">{featuredEvent.format}</span></div>
                      </div>
                      <div className="flex space-x-3">
                        <Button onClick={() => toggleRSVP(featuredEvent.id)} className={`flex-1 ${rsvpEvents.has(featuredEvent.id) ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'}`}>{rsvpEvents.has(featuredEvent.id) ? <><Bell className="w-4 h-4 mr-2" />RSVP'd</> : 'RSVP Now'}</Button>
                        <Button variant="outline" className="border-purple-500/30 text-purple-400"><Share2 className="w-4 h-4" /></Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{getFilteredEvents().filter(event => !event.featured).map((event) => <EventCard key={event.id} event={event} rsvpEvents={rsvpEvents} toggleRSVP={toggleRSVP} />)}</div>
          </TabsContent>
          <TabsContent value="past" className="space-y-6"><div className="grid md:grid-cols-2 gap-6">{pastEventsData.map((event) => <PastEventCard key={event.id} event={event} />)}</div></TabsContent>
        </Tabs>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">This Week's Schedule</h2>
          <Card className="glass-effect cyber-border"><CardContent className="p-6"><div className="grid grid-cols-7 gap-4">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (<div key={day} className="text-center"><div className="text-sm text-gray-400 mb-2">{day}</div><div className="space-y-2">{index === 1 && <div className="bg-purple-600/20 border border-purple-600/30 rounded p-2"><div className="text-xs text-purple-400 font-semibold">AI Workshop</div><div className="text-xs text-gray-400">2:00 PM</div></div>}{index === 3 && <div className="bg-green-600/20 border border-green-600/30 rounded p-2"><div className="text-xs text-green-400 font-semibold">Design Thinking</div><div className="text-xs text-gray-400">6:00 PM</div></div>}{index === 5 && <div className="bg-blue-600/20 border border-blue-600/30 rounded p-2"><div className="text-xs text-blue-400 font-semibold">Hackathon</div><div className="text-xs text-gray-400">9:00 AM</div></div>}</div></div>))}</div></CardContent></Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <Card className="glass-effect cyber-border neon-glow"><CardContent className="p-12"><h2 className="text-4xl font-bold gradient-text mb-6">Ready to Level Up?</h2><p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Join thousands of learners, creators, and innovators. Attend events, participate in challenges, and accelerate your growth.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 text-lg"><Calendar className="w-5 h-5 mr-2" />View Full Calendar</Button><Button variant="outline" className="border-purple-500/30 text-purple-400 px-8 py-3 text-lg"><Plus className="w-5 h-5 mr-2" />Host Your Event</Button></div></CardContent></Card>
        </motion.div>
      </div>
    </div>
  );
};

export default EventsPage;