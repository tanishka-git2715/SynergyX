import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { toast } from '@/components/ui/use-toast';
import '@/lib/firebase';

export default function SignupUpload() {
  const [resume, setResume] = useState(null);
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state || {};

  // Handle Magic Link sign-in
  useEffect(() => {
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('synergyxSignUpEmail');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          setSignedIn(true);
          toast({ title: 'Signed in!', description: 'You are now authenticated.' });
        })
        .catch((err) => {
          toast({ variant: 'destructive', title: 'Sign-in error', description: err.message });
        });
    } else {
      setSignedIn(true); // Already signed in or not using link
    }
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file && !['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(file.type)) {
      setError('Please upload a PDF or DOCX file.');
      return;
    }
    setResume(file);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume && !link) {
      setError('Please upload a resume or provide a link.');
      return;
    }
    setLoading(true);
    try {
      // Prepare form data for backend
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('role', form.role);
      if (resume) formData.append('resume', resume);
      if (link) formData.append('linkedinUrl', link);
      // Call backend Cloud Function
      const response = await fetch('https://us-central1-synergyx-hub.cloudfunctions.net/joinSynergyX', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        navigate('/signup/review', { state: { ...form, profile: data.profile } });
      } else {
        setError(data.error || 'Failed to generate profile.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!signedIn) {
    return <div className="min-h-screen flex items-center justify-center text-white">Authenticating...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-purple-900 to-blue-900">
      <div className="w-full max-w-md bg-white/10 rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-bold mb-4 text-white">Add Your Professional Info</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-1">Upload Resume (PDF/DOCX)</label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="w-full" />
            {resume && <div className="text-green-300 mt-1">{resume.name}</div>}
          </div>
          <div className="text-center text-white">or</div>
          <div>
            <label className="block text-white mb-1">LinkedIn or Portfolio URL</label>
            <input type="url" value={link} onChange={e => setLink(e.target.value)} className="w-full px-3 py-2 rounded bg-white/80" placeholder="https://linkedin.com/in/yourprofile" />
          </div>
          {error && <div className="text-red-300 text-sm">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 rounded mt-4">{loading ? 'Generating...' : 'Continue'}</button>
        </form>
      </div>
    </div>
  );
} 