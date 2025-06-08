import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, MessageCircle } from 'lucide-react';

const mentorshipCircles = [
  { name: 'Design Leadership Circle', mentor: 'Sarah Chen', company: 'Google', members: 12, nextSession: 'Tomorrow 3PM', image: 'Professional woman leading a design team meeting' },
  { name: 'Startup Design Strategy', mentor: 'Alex Rodriguez', company: 'Airbnb', members: 8, nextSession: 'Friday 2PM', image: 'Design strategy session with startup team around a whiteboard' }
];

const MentorshipTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Mentorship Circles</h2>
        <div className="space-y-4">
          {mentorshipCircles.map((circle, index) => (
            <motion.div
              key={circle.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-effect cyber-border">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img  className="w-12 h-12 rounded-full object-cover" alt={circle.mentor} src="https://images.unsplash.com/photo-1681184235400-251f75d4ff66" />
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-1">{circle.name}</h3>
                      <p className="text-sm text-gray-400 mb-2">
                        Led by {circle.mentor} • {circle.company}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {circle.members} members
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {circle.nextSession}
                          </div>
                        </div>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Join Circle
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">1:1 Mentorship Booking</h2>
        <Card className="glass-effect cyber-border">
          <CardHeader>
            <CardTitle className="text-white">Book a Session</CardTitle>
            <CardDescription className="text-gray-400">
              Get personalized guidance from industry experts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Skill Focus</label>
                <select className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white">
                  <option>UI/UX Design</option>
                  <option>Product Strategy</option>
                  <option>Career Guidance</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Session Type</label>
                <select className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white">
                  <option>30 min - $50</option>
                  <option>60 min - $90</option>
                  <option>90 min - $120</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Preferred Date</label>
              <input 
                type="date" 
                className="w-full p-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white"
              />
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
              <MessageCircle className="w-4 h-4 mr-2" />
              Book Session
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </motion.div>
);

export default MentorshipTab;