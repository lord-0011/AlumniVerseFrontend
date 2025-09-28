import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAlumniDashboardStats } from '../api';
import { Briefcase, UserPlus, FileText, PlusCircle, BarChart3, Calendar, Users } from 'lucide-react';

const AlumniDashboard = ({ user, userName }) => {
  const [stats, setStats] = useState({
    jobsPosted: 0,
    mentees: 0,
    pendingRequests: 0,
    pendingConnections: 0,
    upcomingEvents: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getAlumniDashboardStats(token);
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, <span className="text-blue-600">{userName}!</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for giving back to our community. Here's how you can contribute.
        </p>
      </div>

      {/* Main Layout with Flexbox */}
      <div className="lg:flex lg:gap-8">
        {/* Left Column (Sticky) */}
        <div className="lg:w-1/3 mb-8 lg:mb-0">
          <div className="sticky top-20 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
                <BarChart3 className="mr-3 text-blue-600" />
                Your Impact
              </h2>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                    <span>Jobs Posted</span>
                    <span>{stats.jobsPosted}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${stats.jobsPosted * 10}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                    <span>Active Mentees</span>
                    <span>{stats.mentees}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${stats.mentees * 10}%` }}></div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-8 bg-gray-100 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-200 transition">
                View Full Analytics
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <Calendar className="mr-3 text-purple-500" />
                Upcoming Events
              </h2>
              <div className="space-y-4">
                {stats.upcomingEvents.length > 0 ? (
                  stats.upcomingEvents.map(event => (
                    <div key={event._id} className="border-b pb-3 last:border-b-0">
                      <h3 className="font-bold text-gray-800">{event.name}</h3>
                      <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No upcoming events.</p>
                )}
              </div>
              <Link to="/events" className="block text-right mt-4 font-semibold text-blue-600 hover:underline">
                View all events →
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column (Scrolling Content) */}
        <div className="lg:w-2/3">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Briefcase className="w-10 h-10 text-green-500 mb-3" />
              <h2 className="text-xl font-bold text-gray-800">Post a Job</h2>
              <p className="text-gray-600 mt-2 mb-4">Share an opportunity with talented students and fellow alumni.</p>
              <Link to="/jobs/add" className="font-semibold text-blue-600 hover:underline flex items-center">
                Post a New Job <PlusCircle className="ml-2" size={18} />
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow relative">
              {stats.pendingRequests > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                  {stats.pendingRequests}
                </div>
              )}
              <UserPlus className="w-10 h-10 text-blue-500 mb-3" />
              <h2 className="text-xl font-bold text-gray-800">Mentor a Student</h2>
              <p className="text-gray-600 mt-2 mb-4">Guide the next generation by sharing your experience and expertise.</p>
              <div className="flex items-center space-x-4">
                <Link to="/mentorship" className="font-semibold text-blue-600 hover:underline">
                  View Requests
                </Link>
                <span className="text-gray-300">|</span>
                <Link to="/my-mentorships" className="font-semibold text-blue-600 hover:underline">
                  View My Mentees
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Users className="w-10 h-10 text-indigo-500 mb-3" />
              <h2 className="text-xl font-bold text-gray-800">Connect with Alumni</h2>
              <p className="text-gray-600 mt-2 mb-4">Find and network with other alumni from our community.</p>
              <Link to="/alumni-directory" className="font-semibold text-blue-600 hover:underline">
                Browse Directory
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FileText className="w-10 h-10 text-purple-500 mb-3" />
              <h2 className="text-xl font-bold text-gray-800">Share Your Story</h2>
              <p className="text-gray-600 mt-2 mb-4">Inspire students by sharing your career journey and achievements.</p>
              <Link to="/feed" className="font-semibold text-blue-600 hover:underline">
                Post on the Feed
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniDashboard;