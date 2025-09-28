import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../api';

const AddJobPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    description: '',
    applicationLink: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { title, company, location, type, description, applicationLink } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await createJob(token, formData);
      navigate('/jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Post a New Job</h1>
      {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input type="text" name="title" value={title} onChange={onChange} required className="w-full mt-1 p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <input type="text" name="company" value={company} onChange={onChange} required className="w-full mt-1 p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" name="location" value={location} onChange={onChange} required className="w-full mt-1 p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Type</label>
            <select name="type" value={type} onChange={onChange} className="w-full mt-1 p-3 border rounded-lg bg-white">
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Application Link (URL)</label>
            <input type="url" name="applicationLink" value={applicationLink} onChange={onChange} required placeholder="https://example.com/careers/job123" className="w-full mt-1 p-3 border rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea name="description" value={description} onChange={onChange} rows="6" required className="w-full mt-1 p-3 border rounded-lg"></textarea>
          </div>
        </div>
        <button type="submit" className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
          Post Job Opening
        </button>
      </form>
    </div>
  );
};

export default AddJobPage;