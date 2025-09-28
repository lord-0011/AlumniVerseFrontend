import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../api';

const ProfileEditPage = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const data = await getUserProfile(token);
        setFormData(data);
      }
    };
    fetchProfile();
  }, []);
  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await updateUserProfile(token, formData);
      navigate('/profile'); // Redirect to profile page on success
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Your Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" name="name" value={formData.name || ''} onChange={onChange} className="w-full mt-1 p-3 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">College Name</label>
          <input type="text" name="collegeName" value={formData.collegeName || ''} onChange={onChange} className="w-full mt-1 p-3 border border-gray-300 rounded-lg" />
        </div>

        {formData.role === 'alumni' ? (
           <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
              <input type="number" name="graduationYear" value={formData.graduationYear || ''} onChange={onChange} className="w-full mt-1 p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Company</label>
              <input type="text" name="currentCompany" value={formData.currentCompany || ''} onChange={onChange} className="w-full mt-1 p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Title</label>
              <input type="text" name="jobTitle" value={formData.jobTitle || ''} onChange={onChange} className="w-full mt-1 p-3 border border-gray-300 rounded-lg" />
            </div>
           </>
        ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expected Graduation</label>
                <input type="number" name="expectedGraduationYear" value={formData.expectedGraduationYear || ''} onChange={onChange} className="w-full mt-1 p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Major</label>
                <input type="text" name="major" value={formData.major || ''} onChange={onChange} className="w-full mt-1 p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Career Goals</label>
                <textarea rows="3" name="careerGoals" value={formData.careerGoals || ''} onChange={onChange} className="w-full mt-1 p-3 border border-gray-300 rounded-lg"></textarea>
              </div>
            </>
        )}
        <button type="submit" className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileEditPage;