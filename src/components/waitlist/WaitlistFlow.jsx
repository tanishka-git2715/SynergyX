import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import WaitlistFormStep1 from './WaitlistFormStep1';
import WaitlistFormStep2 from './WaitlistFormStep2';
import WaitlistFormStep3 from './WaitlistFormStep3';
import WaitlistFormStep4 from './WaitlistFormStep4';
import WaitlistSuccessStep from './WaitlistSuccessStep';
import WaitlistPlatformFeatures from './WaitlistPlatformFeatures';

const WaitlistFlow = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [waitlistId, setWaitlistId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    role: '',
    skills: [],
    clubs: [],
    goals: '',
    linkedinProfile: '',
    githubProfile: '',
    personalWebsite: '',
    resumeFileName: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field]?.includes(value)
        ? prev[field].filter(item => item !== value)
        : [...(prev[field] || []), value]
    }));
  };

  const handleStepComplete = (docId) => {
    if (docId) {
      setWaitlistId(docId);
    }
    setCurrentStep(prev => prev + 1);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Let's get to know you";
      case 2:
        return "What's your role?";
      case 3:
        return "Customize your experience";
      case 4:
        return "Complete Your Professional Profile";
      case 5:
        return "Welcome aboard!";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Tell us a bit about yourself to get started";
      case 2:
        return "This helps us personalize your SynergyX experience";
      case 3:
        return "Choose your interests and goals";
      case 4:
        return "Share your resume or link your professional profiles to help us understand your skills and experience better";
      case 5:
        return "You're now part of the SynergyX community";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {currentStep < 5 && (
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
                <span>Step {currentStep} of 4</span>
                <span>{Math.round((currentStep / 4) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="xp-bar h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
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
                  {getStepTitle()}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {getStepDescription()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentStep === 1 && (
                  <WaitlistFormStep1
                    formData={formData}
                    handleInputChange={handleInputChange}
                    onStepComplete={handleStepComplete}
                  />
                )}
                {currentStep === 2 && (
                  <WaitlistFormStep2
                    formData={formData}
                    handleInputChange={handleInputChange}
                    waitlistId={waitlistId}
                    onStepComplete={handleStepComplete}
                  />
                )}
                {currentStep === 3 && (
                  <WaitlistFormStep3
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleArrayToggle={handleArrayToggle}
                    waitlistId={waitlistId}
                    onStepComplete={handleStepComplete}
                  />
                )}
                {currentStep === 4 && (
                  <WaitlistFormStep4
                    formData={formData}
                    handleInputChange={handleInputChange}
                    waitlistId={waitlistId}
                    onStepComplete={handleStepComplete}
                  />
                )}
                {currentStep === 5 && (
                  <WaitlistSuccessStep formData={formData} />
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <WaitlistPlatformFeatures
              platforms={[
                {
                  title: 'Skill Based Learning',
                  description: 'Access top-rated courses, AI guides, and peer reviews',
                  icon: 'BookOpen',
                  features: [
                    'Community-driven learning',
                    'Career roadmaps',
                    'AI tool guides',
                    'Live Q&As'
                  ]
                },
                {
                  title: 'Work Platform',
                  description: 'Discover opportunities through social-style feeds',
                  icon: 'Briefcase',
                  features: [
                    'Smart job matching',
                    'Profile-based applications',
                    'Micro-trials',
                    'Team formation'
                  ]
                },
                {
                  title: 'Purpose Driven Clubs',
                  description: 'Join communities solving real problems',
                  icon: 'Users',
                  features: [
                    'Discussion rooms',
                    'Anonymous posting',
                    'Resource sharing',
                    'Expert sessions'
                  ]
                }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistFlow; 