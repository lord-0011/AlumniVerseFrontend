import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile } from '../api';
import { Edit } from 'lucide-react';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authorized.');
        return;
      }
      try {
        const data = await getUserProfile(token);
        setProfile(data);
      } catch (err) {
        setError('Failed to fetch profile.');
      }
    };
    fetchProfile();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
        <Link
          to="/profile/edit"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center"
        >
          <Edit className="mr-2" size={18} /> Edit Profile
        </Link>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-bold text-gray-600">Name</label>
          <p className="text-lg text-gray-800">{profile.name}</p>
        </div>
        <div>
          <label className="text-sm font-bold text-gray-600">Email</label>
          <p className="text-lg text-gray-800">{profile.email}</p>
        </div>
        <div>
          <label className="text-sm font-bold text-gray-600">College</label>
          <p className="text-lg text-gray-800">{profile.collegeName || 'Not set'}</p>
        </div>
        
        {/* Role-specific fields */}
        {profile.role === 'alumni' ? (
          <>
            <div>
              <label className="text-sm font-bold text-gray-600">Graduation Year</label>
              <p className="text-lg text-gray-800">{profile.graduationYear || 'Not set'}</p>
            </div>
            <div>
              <label className="text-sm font-bold text-gray-600">Company</label>
              <p className="text-lg text-gray-800">{profile.currentCompany || 'Not set'}</p>
            </div>
            <div>
              <label className="text-sm font-bold text-gray-600">Job Title</label>
              <p className="text-lg text-gray-800">{profile.jobTitle || 'Not set'}</p>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="text-sm font-bold text-gray-600">Expected Graduation</label>
              <p className="text-lg text-gray-800">{profile.expectedGraduationYear || 'Not set'}</p>
            </div>
            <div>
              <label className="text-sm font-bold text-gray-600">Major</label>
              <p className="text-lg text-gray-800">{profile.major || 'Not set'}</p>
            </div>
             <div>
              <label className="text-sm font-bold text-gray-600">Career Goals</label>
              <p className="text-lg text-gray-800">{profile.careerGoals || 'Not set'}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;