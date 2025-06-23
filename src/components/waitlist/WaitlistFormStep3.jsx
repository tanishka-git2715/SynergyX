import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { saveWaitlistStep3 } from '@/lib/firebase';

const skillCategories = [
  'Design', 'AI/ML', 'Finance', 'Web Dev', 'Mobile Dev', 'Data Science',
  'Marketing', 'Writing', 'Photography', 'Video Editing', 'Music Production',
  'Business', 'Entrepreneurship', 'Public Speaking', 'Leadership'
];

const clubTypes = [
  'Climate Change', 'Mental Health', 'AI Ethics', 'Social Justice',
  'Gaming', 'Writing', 'Cooking', 'Books', 'Fitness', 'Travel',
  'Photography', 'Music', 'Art', 'Tech Innovation', 'Startups'
];

const WaitlistFormStep3 = ({ formData, handleInputChange, handleArrayToggle, waitlistId, onStepComplete }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    if (!formData.skills?.length || !formData.clubs?.length || !formData.goals) {
      toast({
        variant: "destructive",
        title: "Please complete all fields",
        description: "Select at least one skill, one club, and share your goals.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { success, error } = await saveWaitlistStep3(waitlistId, formData);
      
      if (success) {
        toast({
          title: "Great progress!",
          description: "Let's complete your profile in the final step.",
        });
        onStepComplete?.();
      } else {
        toast({
          variant: "destructive",
          title: "Submission failed",
          description: error || "Please try again later.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div>
        <Label className="text-white text-lg font-semibold mb-4 block">What skills interest you?</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {skillCategories.map((skill) => (
            <Badge
              key={skill}
              onClick={() => !isSubmitting && handleArrayToggle('skills', skill)}
              className={`cursor-pointer p-3 text-center transition-all ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              } ${
                formData.skills?.includes(skill)
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-white text-lg font-semibold mb-4 block">Which clubs would you join?</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {clubTypes.map((club) => (
            <Badge
              key={club}
              onClick={() => !isSubmitting && handleArrayToggle('clubs', club)}
              className={`cursor-pointer p-3 text-center transition-all ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              } ${
                formData.clubs?.includes(club)
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              {club}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="goals" className="text-white text-lg font-semibold">What are your main goals?</Label>
        <textarea
          id="goals"
          value={formData.goals}
          onChange={(e) => handleInputChange('goals', e.target.value)}
          placeholder="Tell us what you want to achieve..."
          className="mt-2 w-full p-4 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 min-h-[100px] resize-none"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Complete Sign Up"}
        </Button>
      </div>
    </motion.div>
  );
};

export default WaitlistFormStep3;