import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';

// Import Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingForm from './pages/OnboardingForm';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import JobsPage from './pages/JobsPage';
import EventsPage from './pages/EventsPage';
import StartupPage from './pages/StartupPage';
import LeaderboardPage from './pages/LeaderboardPage';
import FindMentorPage from './pages/FindMentorPage';
import MentorshipRequestsPage from './pages/MentorshipRequestsPage';
import MyMentorshipsPage from './pages/MyMentorshipsPage';

// Import Components
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // On initial app load, check localStorage for existing session
  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    const role = localStorage.getItem('userRole');

    if (token && name && role) {
      setUser({ type: role });
      setUserName(name);
      
      const lastVisitedPath = localStorage.getItem('lastVisitedPath');
      if (lastVisitedPath) {
        navigate(lastVisitedPath, { replace: true });
      }
    }
  }, []);

  // Every time the page changes, save the current path
  useEffect(() => {
    if (user && location.pathname !== '/landing' && !location.pathname.startsWith('/auth')) {
      localStorage.setItem('lastVisitedPath', location.pathname);
    }
  }, [location, user]);

  const handleLogin = (userType, name) => {
    setUser({ type: userType });
    setUserName(name);
    navigate('/home');
  };

  const handleLogout = () => {
    setUser(null);
    setUserName('');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('lastVisitedPath');
    navigate('/landing');
  };

  return (
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/auth/:role" element={<AuthPage onLogin={handleLogin} />} />
      <Route path="/onboarding/:role" element={<OnboardingForm onLogin={handleLogin} />} />

      <Route
        path="/"
        element={
          <ProtectedRoute user={user}>
            <MainLayout user={user} userName={userName} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<HomePage user={user} userName={userName} />} />
        <Route path="feed" element={<FeedPage user={user} />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="startups" element={<StartupPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="mentors" element={<FindMentorPage />} />
        <Route path="mentorship" element={<MentorshipRequestsPage />} />
        <Route path="my-mentorships" element={<MyMentorshipsPage />} />
      </Route>
      
      <Route path="*" element={<Navigate to={user ? "/home" : "/landing"} />} />
    </Routes>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;