import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api';

const AddEventPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
    image: '',
  });
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await createEvent(token, formData);
      navigate('/events');
    } catch (error) {
      console.error("Failed to create event", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create a New Event</h1>
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <input type="text" name="name" placeholder="Event Name" onChange={onChange} required className="w-full p-3 border rounded-lg" />
          <input type="date" name="date" onChange={onChange} required className="w-full p-3 border rounded-lg" />
          <input type="text" name="location" placeholder="Location (e.g., Online or City)" onChange={onChange} required className="w-full p-3 border rounded-lg" />
          <input type="url" name="image" placeholder="Image URL (optional)" onChange={onChange} className="w-full p-3 border rounded-lg" />
          <textarea name="description" placeholder="Event Description" onChange={onChange} rows="5" required className="w-full p-3 border rounded-lg"></textarea>
        </div>
        <button type="submit" className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-lg">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;