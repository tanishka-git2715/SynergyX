import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { toast } from '@/components/ui/use-toast';
import '@/lib/firebase'; // Ensure Firebase is initialized

const roles = [
  { value: 'learner', label: 'Learner' },
  { value: 'employer', label: 'Employer' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'mentor', label: 'Mentor' },
  { value: 'partner', label: 'Partner' },
  { value: 'creator', label: 'Creator' },
];

const actionCodeSettings = {
  url: window.location.origin + '/signup/upload',
  handleCodeInApp: true,
};

export default function SignupIndex() {
  const [form, setForm] = useState({ name: '', email: '', role: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const auth = getAuth();
      await sendSignInLinkToEmail(auth, form.email, actionCodeSettings);
      window.localStorage.setItem('synergyxSignUpEmail', form.email);
      setSent(true);
      toast({ title: 'Check your email', description: 'A sign-in link has been sent.' });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-purple-900 to-blue-900">
      <div className="w-full max-w-md bg-white/10 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Join SynergyX</h1>
        {sent ? (
          <div className="text-white text-center">A sign-in link has been sent to your email. Please check your inbox.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white mb-1">Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 rounded bg-white/80" />
            </div>
            <div>
              <label className="block text-white mb-1">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 rounded bg-white/80" />
            </div>
            <div>
              <label className="block text-white mb-1">Role</label>
              <select name="role" value={form.role} onChange={handleChange} required className="w-full px-3 py-2 rounded bg-white/80">
                <option value="">Select a role</option>
                {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 rounded mt-4">
              {loading ? 'Sending...' : 'Continue'}
            </button>
          </form>
        )}
        <button onClick={() => navigate('/feed')} className="w-full mt-4 text-blue-300 underline">Continue as Guest</button>
      </div>
    </div>
  );
} 