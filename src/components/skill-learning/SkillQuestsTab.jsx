import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Trophy, Target } from 'lucide-react';

const skillQuests = [
  { title: 'Master Color Theory', progress: 75, xp: 250, difficulty: 'Intermediate', timeLeft: '3 days' },
  { title: 'Typography Fundamentals', progress: 100, xp: 300, difficulty: 'Beginner', timeLeft: 'Completed' },
  { title: 'User Research Methods', progress: 30, xp: 400, difficulty: 'Advanced', timeLeft: '1 week' }
];

const SkillQuestsTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white">Gamified Progress Tracker</h2>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-bold">2,450 XP</span>
        </div>
        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          Level 12
        </Badge>
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillQuests.map((quest, index) => (
        <motion.div
          key={quest.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="glass-effect cyber-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg">{quest.title}</CardTitle>
                <Trophy className={`w-6 h-6 ${quest.progress === 100 ? 'text-yellow-400' : 'text-gray-400'}`} />
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <Badge variant="outline" className="text-purple-400 border-purple-400">
                  {quest.difficulty}
                </Badge>
                <div className="flex items-center text-gray-400">
                  <Target className="w-4 h-4 mr-1" />
                  {quest.xp} XP
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-purple-400">{quest.progress}%</span>
                </div>
                <Progress value={quest.progress} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{quest.timeLeft}</span>
                  {quest.progress < 100 && (
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Continue
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default SkillQuestsTab;