import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { toast } from '@/components/ui/use-toast';
import '@/lib/firebase';

export default function SignupReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const profileFromBackend = location.state?.profile;
  const form = location.state || {};
  const [profile, setProfile] = useState(profileFromBackend || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleContinue = async () => {
    setLoading(true);
    setError('');
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const db = getFirestore();
      // Save to users and profiles collections
      await setDoc(doc(db, 'users', user.uid), {
        ...profile,
        email: form.email,
        role: form.role,
        createdAt: serverTimestamp(),
      });
      await setDoc(doc(db, 'profiles', user.uid), {
        ...profile,
        email: form.email,
        role: form.role,
        createdAt: serverTimestamp(),
      });
      toast({ title: 'Profile saved!', description: 'Welcome to SynergyX.' });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center text-white">No profile data found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-purple-900 to-blue-900">
      <div className="w-full max-w-md bg-white/10 rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-bold mb-4 text-white">Review & Edit Your Profile</h2>
        <form className="space-y-3">
          <div>
            <label className="block text-white mb-1">Full Name</label>
            <input name="fullName" value={profile.fullName || ''} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white/80" />
          </div>
          <div>
            <label className="block text-white mb-1">Short Bio</label>
            <textarea name="shortBio" value={profile.shortBio || ''} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white/80" />
          </div>
          <div>
            <label className="block text-white mb-1">Role</label>
            <input name="role" value={profile.role || ''} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white/80" />
          </div>
          <div>
            <label className="block text-white mb-1">Education</label>
            <input name="education" value={profile.education || ''} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white/80" />
          </div>
          {/* Add more fields as needed */}
        </form>
        {error && <div className="text-red-300 text-sm mt-2">{error}</div>}
        <button onClick={handleContinue} disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 rounded mt-6">{loading ? 'Saving...' : 'Continue'}</button>
      </div>
    </div>
  );
} 