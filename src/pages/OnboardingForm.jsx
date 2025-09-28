import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../api'; // Import the new API function

const OnboardingForm = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Use a single state object to hold all form data
  const [formData, setFormData] = useState({
    name: '',
    collegeName: '',
    graduationYear: '',
    currentCompany: '',
    jobTitle: '',
    expectedGraduationYear: '',
    major: '',
    careerGoals: ''
  });

  const { name, collegeName, graduationYear, currentCompany, jobTitle, expectedGraduationYear, major, careerGoals } = formData;
  
  // A single handler to update the state
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const isAlumni = role === 'alumni';
  const roleDisplay = role.charAt(0).toUpperCase() + role.slice(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You are not authenticated. Please log in again.');
        return;
      }

      // Send the relevant data based on the role
      const profileData = { name, collegeName };
      if (isAlumni) {
        Object.assign(profileData, { graduationYear, currentCompany, jobTitle });
      } else {
        Object.assign(profileData, { expectedGraduationYear, major, careerGoals });
      }

      const res = await updateUserProfile(token, profileData);

      if (res.message) { // Check for backend error message
        setError(res.message);
      } else {
        // After successful profile update, navigate to the homepage
        // Note: You might want to update the userName in localStorage here too
        localStorage.setItem('userName', res.name);
        navigate('/home');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome to the Community!</h1>
        <p className="text-center text-gray-500 mb-8">
          Please complete your {roleDisplay} profile to continue.
        </p>

        {error && <p className="text-center text-red-500 bg-red-100 p-2 rounded-md my-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Common Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="name" value={name} onChange={onChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg" />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">College/University Name</label>
              <input type="text" name="collegeName" value={collegeName} onChange={onChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg" />
            </div>

            {/* Role-Specific Fields */}
            {isAlumni ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
                  <input type="number" name="graduationYear" value={graduationYear} onChange={onChange} placeholder="e.g., 2018" required className="w-full mt-1 p-3 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Company</label>
                  <input type="text" name="currentCompany" value={currentCompany} onChange={onChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Job Title / Designation</label>
                  <input type="text" name="jobTitle" value={jobTitle} onChange={onChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expected Graduation Year</label>
                  <input type="number" name="expectedGraduationYear" value={expectedGraduationYear} onChange={onChange} placeholder="e.g., 2027" required className="w-full mt-1 p-3 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Major / Field of Study</label>
                  <input type="text" name="major" value={major} onChange={onChange} placeholder="e.g., Computer Science" required className="w-full mt-1 p-3 border border-gray-300 rounded-lg" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Career Goals</label>
                  <textarea rows="3" name="careerGoals" value={careerGoals} onChange={onChange} placeholder="e.g., To become a full-stack developer..." className="w-full mt-1 p-3 border border-gray-300 rounded-lg"></textarea>
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingForm;