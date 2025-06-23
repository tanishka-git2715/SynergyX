import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { signIn } from '@/lib/firebase';

const LoginPage = ({ onLoginSuccess }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { success, user, error } = await signIn(formData.email, formData.password);
      
      if (success) {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to your account.",
        });
        onLoginSuccess?.(user);
      } else {
        toast({
          variant: "destructive",
          title: "Sign in failed",
          description: error || "Please check your credentials and try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 space-y-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl"
      >
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Welcome Back
          </motion.h2>
          <p className="text-gray-200">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Label htmlFor="email" className="text-white text-sm font-medium block mb-2">Email address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:ring-2 focus:ring-white/20 text-white placeholder-gray-300 transition-all"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Label htmlFor="password" className="text-white text-sm font-medium block mb-2">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:ring-2 focus:ring-white/20 text-white placeholder-gray-300 transition-all"
              required
            />
          </motion.div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={formData.rememberMe}
                onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300" 
              />
              <span className="ml-2 text-sm text-gray-200">Remember me</span>
            </label>
            <a href="#" className="text-sm text-gray-200 hover:text-white transition-colors">
              Forgot password?
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-200">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {['Google', 'GitHub', 'LinkedIn'].map((provider) => (
              <Button
                key={provider}
                type="button"
                variant="outline"
                onClick={() => console.log(`${provider} login clicked`)}
                className="bg-white/5 border border-white/10 hover:bg-white/10 text-white"
              >
                {provider}
              </Button>
            ))}
          </div>

          <p className="text-center text-gray-200 text-sm">
            Don't have an account?{' '}
            <a href="#" className="font-semibold text-white hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage; 