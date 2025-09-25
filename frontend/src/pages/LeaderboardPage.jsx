import React from 'react';
import { Award, TrendingUp, User } from 'lucide-react';

// Mock data for the leaderboard
const leaderboardData = [
  { rank: 1, name: 'Rohan Sharma', role: 'Alumni', score: 2500, avatar: 'rohan' },
  { rank: 2, name: 'Priya Sharma', role: 'Alumni', score: 2350, avatar: 'priya' },
  { rank: 3, name: 'Kavita Singh', role: 'Student', score: 2100, avatar: 'kavita' },
  { rank: 4, name: 'Anjali Mehta', role: 'Alumni', score: 1980, avatar: 'anjali' },
  { rank: 5, name: 'Vikram Rao', role: 'Student', score: 1850, avatar: 'vikram' },
  { rank: 6, name: 'Sonia Desai', role: 'Alumni', score: 1700, avatar: 'sonia' },
  { rank: 7, name: 'Arjun Verma', role: 'Student', score: 1620, avatar: 'arjun' },
  { rank: 8, name: 'Neha Gupta', role: 'Alumni', score: 1540, avatar: 'neha' },
];

const LeaderboardPage = () => {
  // Function to get medal color based on rank
  const getMedalColor = (rank) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-yellow-600';
    return 'text-gray-500';
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <Award className="mr-3 text-blue-600" size={32} />
          Community Leaderboard
        </h1>
        <p className="text-gray-600 mt-2">
          Recognizing the most active and helpful members of our community.
        </p>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="min-w-full">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 bg-gray-50 p-4 font-bold text-gray-600 text-sm">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-6">Member</div>
            <div className="col-span-4 text-right">Contribution Score</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {leaderboardData.map((user) => (
              <div key={user.rank} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                {/* Rank */}
                <div className="col-span-2 text-center flex items-center justify-center">
                  <span className={`text-xl font-bold ${getMedalColor(user.rank)}`}>
                    {user.rank <= 3 ? <Award size={24} className="inline-block" /> : user.rank}
                  </span>
                </div>

                {/* Member Info */}
                <div className="col-span-6 flex items-center">
                  <img
                    className="h-10 w-10 rounded-full mr-4"
                    src={`https://i.pravatar.cc/150?u=${user.avatar}`}
                    alt={`${user.name}'s avatar`}
                  />
                  <div>
                    <p className="font-bold text-gray-800">{user.name}</p>
                    <p className={`text-xs font-semibold ${user.role === 'Alumni' ? 'text-blue-500' : 'text-green-500'}`}>
                      {user.role}
                    </p>
                  </div>
                </div>

                {/* Score */}
                <div className="col-span-4 text-right">
                  <span className="font-bold text-lg text-gray-800">{user.score}</span>
                  <TrendingUp className="inline-block ml-2 text-green-500" size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;