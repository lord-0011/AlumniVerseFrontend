import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserById } from '../api';
import { Briefcase, GraduationCap } from 'lucide-react';

const UserProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get the user ID from the URL

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getUserById(token, id);
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) return <div>Loading profile...</div>;
  if (!profile) return <div>Profile not found.</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center space-x-6 mb-6">
          <img
            className="h-24 w-24 rounded-full"
            src={`https://i.pravatar.cc/150?u=${profile.name}`}
            alt="Profile Avatar"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
            <p className="text-lg text-gray-500 capitalize">{profile.role}</p>
          </div>
        </div>

        <div className="border-t pt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Details</h2>
          {profile.role === 'alumni' ? (
            <>
              <div className="flex items-center">
                <Briefcase size={20} className="text-gray-500 mr-3" />
                <span>Works as a {profile.jobTitle} at <strong>{profile.currentCompany}</strong></span>
              </div>
              <div className="flex items-center">
                <GraduationCap size={20} className="text-gray-500 mr-3" />
                <span>Graduated in {profile.graduationYear}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center">
                <Briefcase size={20} className="text-gray-500 mr-3" />
                <span>Studies {profile.major}</span>
              </div>
              <div className="flex items-center">
                <GraduationCap size={20} className="text-gray-500 mr-3" />
                <span>Expected to graduate in {profile.expectedGraduationYear}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;