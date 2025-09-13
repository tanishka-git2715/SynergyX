import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import HomePage from '@/pages/HomePage';
import WaitlistPage from '@/pages/WaitlistPage';
import SkillLearningPage from '@/pages/SkillLearningPage';
import WorkPlatformPage from '@/pages/WorkPlatformPage';
import ClubsPage from '@/pages/ClubsPage';
import EventsPage from '@/pages/EventsPage';
import MentorshipPage from '@/pages/MentorshipPage';
import SignupIndex from '@/pages/signup/index';
import SignupUpload from '@/pages/signup/upload';
import SignupReview from '@/pages/signup/review';
import { supabase } from '@/lib/supabaseClient';
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} session={session} />
          <main className="pt-24"> {/* Increased top padding here */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/waitlist" element={<WaitlistPage />} />
              <Route path="/learn" element={<SkillLearningPage />} />
              <Route path="/work" element={<WorkPlatformPage />} />
              <Route path="/clubs" element={<ClubsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/mentorship" element={<MentorshipPage />} />
              <Route path="/signup" element={<SignupIndex />} />
              <Route path="/signup/upload" element={<SignupUpload />} />
              <Route path="/signup/review" element={<SignupReview />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;