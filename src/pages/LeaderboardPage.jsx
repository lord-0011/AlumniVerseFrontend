import React, { useState, useEffect } from 'react';
import { getLeaderboardData } from '../api';
import { Trophy, Briefcase, UserCheck, MessageSquare } from 'lucide-react';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState({ 
    topAlumniByPoints: [], 
    topMentors: [], 
    topJobPosters: [], 
    topPosters: [] 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getLeaderboardData(token);
        setLeaderboard(data);
      } catch (err) {
        setError('Could not fetch leaderboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-12">
      {/* Main Points Leaderboard */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <Trophy className="mx-auto h-12 w-12 text-yellow-500" />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Top Alumni Leaderboard</h1>
        <p className="text-gray-600 mt-2">Ranking based on overall community contributions.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          {leaderboard.topAlumniByPoints.map((alumnus, index) => (
            <div key={alumnus._id} className="flex items-center justify-between border-b pb-3 last:border-b-0">
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-400 w-8">{index + 1}</span>
                <img src={`https://i.pravatar.cc/40?u=${alumnus.name}`} alt={alumnus.name} className="h-10 w-10 rounded-full mx-4" />
                <div>
                  <p className="font-bold">{alumnus.name}</p>
                  <p className="text-sm text-gray-500">{alumnus.jobTitle || 'Alumnus'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-600">{alumnus.points} pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category-Specific Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Top Mentors */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><UserCheck className="mr-3 text-blue-500" /> Top Mentors</h2>
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            {leaderboard.topMentors.map((user, index) => (
              <div key={user._id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-bold text-gray-400 w-6">{index + 1}.</span>
                  <p className="font-semibold">{user.name}</p>
                </div>
                <p className="font-bold text-blue-600">{user.count} Mentees</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Job Posters */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><Briefcase className="mr-3 text-green-500" /> Top Job Posters</h2>
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            {leaderboard.topJobPosters.map((user, index) => (
              <div key={user._id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-bold text-gray-400 w-6">{index + 1}.</span>
                  <p className="font-semibold">{user.name}</p>
                </div>
                <p className="font-bold text-green-600">{user.count} Jobs</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Posters */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><MessageSquare className="mr-3 text-yellow-500" /> Top Posters</h2>
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            {leaderboard.topPosters.map((user, index) => (
              <div key={user._id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-bold text-gray-400 w-6">{index + 1}.</span>
                  <p className="font-semibold">{user.name}</p>
                </div>
                <p className="font-bold text-yellow-600">{user.count} Posts</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;