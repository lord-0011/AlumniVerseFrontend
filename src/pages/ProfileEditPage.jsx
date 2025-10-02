import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile, uploadProfilePicture } from '../api'; // Import uploadProfilePicture
import { Camera } from 'lucide-react';

const ProfileEditPage = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const data = await getUserProfile(token);
        setFormData(data);
        setImagePreview(data.profilePicture || ''); // Set initial image preview
      }
    };
    fetchProfile();
  }, []);
  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      // First, update the text-based fields
      await updateUserProfile(token, formData);
      
      // Second, if a new image was chosen, upload it
      if (imageFile) {
        const newPictureData = await uploadProfilePicture(token, imageFile);
        // Update localStorage with the new picture URL
        localStorage.setItem('userProfilePicture', newPictureData.profilePicture);
      }
      
      navigate('/profile'); // Redirect to profile page on success
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Your Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center">
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
          <label className="relative cursor-pointer">
            <img 
              src={imagePreview || 'https://i.pravatar.cc/150'} 
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity">
              <Camera />
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={onImageChange} />
          </label>
        </div>

        {/* Name and College are displayed but not editable */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <p className="w-full mt-1 p-3 bg-gray-100 text-gray-500 rounded-lg">{formData.name || ''}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">College Name</label>
          <p className="w-full mt-1 p-3 bg-gray-100 text-gray-500 rounded-lg">{formData.collegeName || ''}</p>
        </div>

        {/* Role-specific editable fields */}
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