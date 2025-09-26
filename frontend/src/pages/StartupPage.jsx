import React, { useState, useEffect } from 'react';
import { getStartups, createStartup } from '../api';
import { Building, PlusCircle, Heart } from 'lucide-react';

const StartupPage = () => {
  const [startups, setStartups] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    stage: 'Idea',
    pitch: '',
    website: '',
    fundingNeeds: '',
  });

  const fetchStartups = async () => {
    const token = localStorage.getItem('token');
    const data = await getStartups(token);
    setStartups(data);
  };

  useEffect(() => {
    fetchStartups();
  }, []);

  const { name, domain, stage, pitch, website, fundingNeeds } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      await createStartup(token, formData);
      setSuccess('Your startup has been listed successfully!');
      setShowForm(false);
      setFormData({ name: '', domain: '', stage: 'Idea', pitch: '', website: '', fundingNeeds: '' });
      fetchStartups();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add startup.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Startup Showcase</h1>
          <p className="text-gray-600 mt-2">Discover ventures from our community.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
          <PlusCircle size={20} className="mr-2" />
          {showForm ? 'Close Form' : 'Add Your Startup'}
        </button>
      </div>

      {success && <div className="bg-green-100 text-green-800 p-4 rounded-lg">{success}</div>}
      {error && <div className="bg-red-100 text-red-800 p-4 rounded-lg">{error}</div>}

      {showForm && (
        <div className="bg-white p-8 rounded-lg shadow-md">
          {/* START: Add New Startup Form */}
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Startup Name</label>
                <input type="text" name="name" value={name} onChange={onChange} required className="w-full mt-1 p-3 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Domain</label>
                <input type="text" name="domain" value={domain} onChange={onChange} required placeholder="e.g., EdTech, FinTech" className="w-full mt-1 p-3 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stage</label>
                <select name="stage" value={stage} onChange={onChange} className="w-full mt-1 p-3 border rounded-lg bg-white">
                  <option>Idea</option>
                  <option>Prototype</option>
                  <option>Early Growth</option>
                  <option>Scaling</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Funding Needs</label>
                <input type="text" name="fundingNeeds" value={fundingNeeds} onChange={onChange} placeholder="e.g., ₹5 Lakhs or Mentorship" className="w-full mt-1 p-3 border rounded-lg" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Website URL</label>
                <input type="url" name="website" value={website} onChange={onChange} className="w-full mt-1 p-3 border rounded-lg" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Pitch Deck URL</label>
                <input type="url" name="pitch" value={pitch} onChange={onChange} className="w-full mt-1 p-3 border rounded-lg" />
              </div>
            </div>
            <button type="submit" className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
              Submit Startup
            </button>
          </form>
          {/* END: Add New Startup Form */}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map(startup => (
          <div key={startup._id} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
            <h2 className="text-xl font-bold text-blue-600">{startup.name}</h2>
            <p className="text-sm font-semibold text-gray-500">{startup.domain}</p>
            <div className="my-3">
              <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">{startup.stage}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Founder: {startup.founder.name}</p>
            {startup.website && <a href={startup.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Visit Website</a>}
            <div className="mt-auto pt-4 border-t">
              {startup.fundingNeeds && (
                <p className="text-sm text-gray-800 font-semibold mb-3">Funding Need: {startup.fundingNeeds}</p>
              )}
              <button className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-pink-600 transition flex items-center justify-center">
                <Heart size={16} className="mr-2" />
                Donate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartupPage;