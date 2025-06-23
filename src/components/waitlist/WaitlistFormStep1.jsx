import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { saveWaitlistStep1 } from '@/lib/firebase';

const WaitlistFormStep1 = ({ formData, handleInputChange, onStepComplete }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState({
    name: '',
    email: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: ''
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Please check your input",
        description: "All fields are required and must be valid.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { success, id, error } = await saveWaitlistStep1(formData);
      
      if (success) {
        toast({
          title: "Great start!",
          description: "Let's continue with your registration.",
        });
        onStepComplete?.(id); // Pass the document ID to the parent
      } else {
        // Check if the error is due to existing email
        if (error?.includes("already registered")) {
          setErrors(prev => ({
            ...prev,
            email: "This email is already registered for the waitlist"
          }));
          toast({
            variant: "destructive",
            title: "Email already registered",
            description: "Please use a different email address or contact support if you need help.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Submission failed",
            description: error || "Please try again later.",
          });
        }
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

  const handleChange = (field, value) => {
    handleInputChange(field, value);
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-white text-lg font-semibold">What's your name?</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => validateForm()}
              placeholder="Enter your full name"
              className={`mt-2 bg-gray-800/50 border-purple-500/30 text-white placeholder-gray-400 text-lg p-4 ${
                errors.name ? 'border-red-500 focus:border-red-500' : ''
              }`}
              required
              disabled={isSubmitting}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.name}
              </motion.p>
            )}
          </div>
          <div>
            <Label htmlFor="email" className="text-white text-lg font-semibold">Email address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => validateForm()}
              placeholder="your@email.com"
              className={`mt-2 bg-gray-800/50 border-purple-500/30 text-white placeholder-gray-400 text-lg p-4 ${
                errors.email ? 'border-red-500 focus:border-red-500' : ''
              }`}
              required
              disabled={isSubmitting}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Continue"}
            </button>
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
};

export default WaitlistFormStep1;