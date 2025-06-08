import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { 
  BookOpen, 
  Briefcase, 
  Users, 
  Calendar, 
  MessageCircle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import WaitlistFormStep1 from '@/components/waitlist/WaitlistFormStep1';
import WaitlistFormStep2 from '@/components/waitlist/WaitlistFormStep2';
import WaitlistFormStep3 from '@/components/waitlist/WaitlistFormStep3';
import WaitlistSuccessStep from '@/components/waitlist/WaitlistSuccessStep';
import WaitlistPlatformFeatures from '@/components/waitlist/WaitlistPlatformFeatures';

const platforms = [
  {
    icon: BookOpen,
    title: "Skill Based Learning",
    description: "Access top-rated courses, AI guides, and peer reviews",
    features: ["Community-driven learning", "AI tool guides", "Career roadmaps", "Live Q&As"]
  },
  {
    icon: Briefcase,
    title: "Work Platform",
    description: "Discover opportunities through social-style feeds",
    features: ["Smart job matching", "Profile-based applications", "Micro-trials", "Team formation"]
  },
  {
    icon: Users,
    title: "Purpose Driven Clubs",
    description: "Join communities solving real problems",
    features: ["Discussion rooms", "Project zones", "Anonymous posting", "Local discovery"]
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Participate in hackathons, workshops, and panels",
    features: ["Weekly challenges", "Expert talks", "Networking events", "Host your own"]
  },
  {
    icon: MessageCircle,
    title: "Mentorship Sessions",
    description: "Connect with industry experts for guidance",
    features: ["1:1 sessions", "Group mentoring", "Skill-based matching", "Flexible pricing"]
  }
];

const WaitlistPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    skills: [],
    clubs: [],
    goals: '',
    experience: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('waitlist_entries')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            role: formData.role,
            skills_interests: formData.skills,
            preferred_clubs: formData.clubs,
            goals: formData.goals,
            past_experiences: formData.experience,
            joined_at: new Date().toISOString()
          }
        ]);

      if (error) {
        throw error;
      }
      
      toast({
        title: "Welcome to SynergyX! 🎉",
        description: "You're on the waitlist! We'll notify you when early access opens.",
      });
      setStep(4);

    } catch (error) {
      console.error('Error submitting waitlist form:', error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WaitlistFormStep1 formData={formData} handleInputChange={handleInputChange} />;
      case 2:
        return <WaitlistFormStep2 formData={formData} handleInputChange={handleInputChange} />;
      case 3:
        return <WaitlistFormStep3 formData={formData} handleInputChange={handleInputChange} handleArrayToggle={handleArrayToggle} />;
      case 4:
        return <WaitlistSuccessStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4"> {/* Removed pt-16 */}
      <div className="max-w-6xl mx-auto">
        {step < 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Join the SynergyX Revolution
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Be among the first to experience the future of Gen Z learning and collaboration.
            </p>
            
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Step {step} of 3</span>
                <span>{Math.round((step / 3) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="xp-bar h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Card className="glass-effect cyber-border">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">
                  {step === 1 && "Let's get to know you"}
                  {step === 2 && "What's your role?"}
                  {step === 3 && "Customize your experience"}
                  {step === 4 && "Welcome aboard!"}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {step === 1 && "Tell us a bit about yourself to get started"}
                  {step === 2 && "This helps us personalize your SynergyX experience"}
                  {step === 3 && "Choose your interests and goals"}
                  {step === 4 && "You're now part of the SynergyX community"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderStep()}
                
                {step < 4 && (
                  <div className="flex justify-between pt-6">
                    {step > 1 && (
                      <Button
                        variant="outline"
                        onClick={() => setStep(step - 1)}
                        className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        if (step === 3) {
                          handleSubmit();
                        } else {
                          setStep(step + 1);
                        }
                      }}
                      disabled={
                        (step === 1 && (!formData.name || !formData.email)) ||
                        (step === 2 && !formData.role)
                      }
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold ml-auto"
                    >
                      {step === 3 ? 'Join Waitlist' : 'Continue'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <WaitlistPlatformFeatures platforms={platforms} />
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage;