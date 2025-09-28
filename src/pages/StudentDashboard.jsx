import React from 'react';
import { Link } from 'react-router-dom';
import { mockJobs } from '../mockJobs';
import { mockEvents } from '../mockEvents';
import { mockPosts } from '../mockPosts';
import { Briefcase, Calendar, Search, UserCheck, MessageSquare } from 'lucide-react';

const StudentDashboard = ({ user, userName }) => {
  const recentJobs = mockJobs.slice(0, 2);
  const upcomingEvents = mockEvents.slice(0, 2);
  const recentPosts = mockPosts.slice(0, 2);

  const topMentors = [
    { name: 'Priya Sharma', field: 'AI & Machine Learning' },
    { name: 'Rohan Kapoor', field: 'Fintech & Product' },
    { name: 'Anjali Mehta', field: 'Sustainable Tech' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, <span className="text-blue-600">{userName}!</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Here's your personalized hub for career growth and networking.
        </p>
      </div>

      {/* Main Layout */}
      <div className="lg:flex lg:gap-8">
        {/* Left Column (Sticky) */}
        <div className="lg:w-1/3 mb-8 lg:mb-0">
          <div className="sticky top-20">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <UserCheck className="mr-3 text-blue-600" />
                Find a Mentor
              </h2>
              <p className="text-gray-600 mb-6">Connect with experienced alumni for guidance.</p>
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-700">Top Mentors to Connect With:</h3>
                {topMentors.map(mentor => (
                  <div key={mentor.name} className="flex items-center space-x-3">
                    <img className="h-8 w-8 rounded-full" src={`https://i.pravatar.cc/40?u=${mentor.name}`} alt={mentor.name} />
                    <div>
                      <p className="text-sm font-bold">{mentor.name}</p>
                      <p className="text-xs text-gray-500">{mentor.field}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative mt-auto pt-6 border-t">
                <input
                  type="text"
                  placeholder="Search by industry or name..."
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 mt-3 text-gray-400" size={20} />
              </div>
              <Link to="/mentors" className="w-full text-center mt-4 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
                Browse All Mentors
              </Link>
              {/* NEW LINK */}
              <Link to="/my-mentorships" className="text-sm text-center mt-3 text-blue-600 hover:underline">
                View My Mentors
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column (Scrolling Content) */}
        <div className="lg:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
                <Briefcase className="mr-3 text-green-500" />
                Recent Job Opportunities
              </h2>
              <div className="space-y-4">
                {recentJobs.map(job => (
                  <div key={job.id} className="border-b pb-3 last:border-b-0">
                    <h3 className="font-bold text-gray-800">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                ))}
              </div>
              <Link to="/jobs" className="block text-right mt-4 font-semibold text-blue-600 hover:underline">
                View all jobs →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
                <Calendar className="mr-3 text-purple-500" />
                Upcoming Events
              </h2>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="border-b pb-3 last:border-b-0">
                    <h3 className="font-bold text-gray-800">{event.name}</h3>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                ))}
              </div>
              <Link to="/events" className="block text-right mt-4 font-semibold text-blue-600 hover:underline">
                View all events →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <MessageSquare className="mr-3 text-yellow-500" />
                Community Feed
              </h2>
              <div className="space-y-4">
                {recentPosts.map(post => (
                  <div key={post.id} className="border-b pb-3 last:border-b-0">
                    <p className="text-sm text-gray-700 truncate">"{post.content}"</p>
                    <p className="text-xs text-gray-500 mt-1">- {post.author.name}</p>
                  </div>
                ))}
              </div>
              <Link to="/feed" className="block text-right mt-4 font-semibold text-blue-600 hover:underline">
                View all posts →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;