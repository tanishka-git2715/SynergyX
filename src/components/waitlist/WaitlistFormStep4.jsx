import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Linkedin, Github, Globe, FileText, X } from 'lucide-react';
import { saveWaitlistStep4 } from '@/lib/firebase';

const WaitlistFormStep4 = ({ formData, handleInputChange, waitlistId, onStepComplete }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [resumeFile, setResumeFile] = React.useState(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const fileInputRef = React.useRef(null);
  const [errors, setErrors] = React.useState({
    linkedinProfile: '',
    githubProfile: '',
    personalWebsite: '',
    resume: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      linkedinProfile: '',
      githubProfile: '',
      personalWebsite: '',
      resume: ''
    };

    // LinkedIn validation (required)
    if (!formData.linkedinProfile?.trim()) {
      newErrors.linkedinProfile = 'LinkedIn profile is required';
      isValid = false;
    } else if (!formData.linkedinProfile.includes('linkedin.com')) {
      newErrors.linkedinProfile = 'Please enter a valid LinkedIn URL';
      isValid = false;
    }

    // GitHub validation (now required)
    if (!formData.githubProfile?.trim()) {
      newErrors.githubProfile = 'GitHub profile is required';
      isValid = false;
    } else if (!formData.githubProfile.includes('github.com')) {
      newErrors.githubProfile = 'Please enter a valid GitHub URL';
      isValid = false;
    }

    // Website validation (optional but must be valid if provided)
    if (formData.personalWebsite?.trim() && !formData.personalWebsite.match(/^https?:\/\/.+\..+$/)) {
      newErrors.personalWebsite = 'Please enter a valid website URL';
      isValid = false;
    }

    // Resume validation
    if (!resumeFile) {
      newErrors.resume = 'Please upload your resume';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
        });
        return;
      }
      if (!file.type.match('application/pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
        });
        return;
      }
      setResumeFile(file);
      setErrors(prev => ({ ...prev, resume: '' }));
      
      // Show success toast
      toast({
        title: "File selected",
        description: `${file.name} is ready to upload.`,
      });
    }
  };

  const removeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Please check your input",
        description: "All required fields must be valid.",
      });
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      const formDataToSave = {
        ...formData,
        resumeFileName: resumeFile.name
      };

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const { success, error, resumeUrl } = await saveWaitlistStep4(waitlistId, formDataToSave, resumeFile);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (success) {
        toast({
          title: "Successfully joined waitlist!",
          description: "We'll keep you updated on our progress.",
        });
        onStepComplete?.();
      } else {
        toast({
          variant: "destructive",
          title: "Submission failed",
          description: error || "Please try again later.",
        });
        setUploadProgress(0);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
      setUploadProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    handleInputChange(field, value);
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
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Resume Upload Section */}
        <div className="space-y-4">
          <Label className="text-white text-lg font-semibold">Upload Your Resume</Label>
          <div
            onClick={() => !resumeFile && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 
              resumeFile ? 'border-green-500 bg-green-500/10' : 
              'border-gray-600 bg-gray-800/30 hover:border-purple-400 cursor-pointer'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
              disabled={isSubmitting}
            />
            
            {resumeFile ? (
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-green-400" />
                    <div className="text-left">
                      <p className="text-sm text-green-400 font-medium">{resumeFile.name}</p>
                      <p className="text-xs text-gray-400">
                        {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  {!isSubmitting && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                      className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                </div>
                {uploadProgress > 0 && (
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-300">
                  Drag and drop your resume file here, or click to browse
                </p>
                <p className="text-xs text-gray-400 mt-2">PDF, DOC, DOCX up to 5MB</p>
              </>
            )}
          </div>
          {errors.resume && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm"
            >
              {errors.resume}
            </motion.p>
          )}
        </div>

        {/* Professional Profiles Section */}
        <div className="space-y-4">
          <Label className="text-white text-lg font-semibold">Share Your Profiles</Label>
          
          {/* LinkedIn Profile */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Linkedin className="w-5 h-5 text-[#0A66C2]" />
              <Label htmlFor="linkedin" className="text-gray-300">LinkedIn Profile</Label>
            </div>
            <Input
              id="linkedin"
              value={formData.linkedinProfile || ''}
              onChange={(e) => handleChange('linkedinProfile', e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className={`bg-gray-800/50 border-purple-500/30 text-white placeholder-gray-400 ${
                errors.linkedinProfile ? 'border-red-500 focus:border-red-500' : ''
              }`}
              disabled={isSubmitting}
            />
            {errors.linkedinProfile && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.linkedinProfile}
              </motion.p>
            )}
          </div>

          {/* GitHub Profile */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Github className="w-5 h-5 text-white" />
              <Label htmlFor="github" className="text-gray-300">GitHub Profile</Label>
            </div>
            <Input
              id="github"
              value={formData.githubProfile || ''}
              onChange={(e) => handleChange('githubProfile', e.target.value)}
              placeholder="https://github.com/yourusername"
              className={`bg-gray-800/50 border-purple-500/30 text-white placeholder-gray-400 ${
                errors.githubProfile ? 'border-red-500 focus:border-red-500' : ''
              }`}
              disabled={isSubmitting}
              required
            />
            {errors.githubProfile && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.githubProfile}
              </motion.p>
            )}
          </div>

          {/* Personal Website */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="w-5 h-5 text-gray-400" />
              <Label htmlFor="website" className="text-gray-300">Personal Portfolio / Website (Optional)</Label>
            </div>
            <Input
              id="website"
              value={formData.personalWebsite || ''}
              onChange={(e) => handleChange('personalWebsite', e.target.value)}
              placeholder="https://yourwebsite.com"
              className={`bg-gray-800/50 border-purple-500/30 text-white placeholder-gray-400 ${
                errors.personalWebsite ? 'border-red-500 focus:border-red-500' : ''
              }`}
              disabled={isSubmitting}
            />
            {errors.personalWebsite && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.personalWebsite}
              </motion.p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? "Saving Profile..." : "Complete Profile"}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default WaitlistFormStep4; 