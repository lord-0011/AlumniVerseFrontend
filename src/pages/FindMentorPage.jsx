import React, { useState, useEffect, useMemo } from 'react';
import { Search, Send } from 'lucide-react';
import { getAllAlumni, createMentorshipRequest, getSentRequests } from '../api'; 

const FindMentorPage = () => {
  const [alumni, setAlumni] = useState([]);
  const [sentRequestIds, setSentRequestIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlumnus, setSelectedAlumnus] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        // Fetch both alumni and the student's sent requests at the same time
        const [alumniData, sentRequestsData] = await Promise.all([
          getAllAlumni(token),
          getSentRequests(token)
        ]);
        
        setAlumni(alumniData);
        // Create a set of alumni IDs that have a pending request
        const pendingAlumniIds = new Set(sentRequestsData.map(req => req.alumni));
        setSentRequestIds(pendingAlumniIds);

      } catch (err) {
        setError('Could not load page data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadPageData();
  }, []);

  const filteredAlumni = useMemo(() => {
    return alumni.filter(alum =>
      alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (alum.jobTitle && alum.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [alumni, searchTerm]);

  const handleSendRequest = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      await createMentorshipRequest(token, selectedAlumnus._id, message);
      
      setSentRequestIds(prevIds => new Set(prevIds).add(selectedAlumnus._id));
      setSuccess(`Request sent successfully to ${selectedAlumnus.name}!`);
      setSelectedAlumnus(null);
      setMessage('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send request.');
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div className="space-y-8">
      {success && <div className="bg-green-100 text-green-800 p-4 rounded-lg">{success}</div>}
      {error && <div className="bg-red-100 text-red-800 p-4 rounded-lg">{error}</div>}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Find a Mentor</h1>
        <p className="text-gray-600 mt-2">Connect with experienced alumni for career guidance.</p>
        <div className="relative mt-6">
          <input
            type="text"
            placeholder="Search by name or job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map(alum => {
          const isRequested = sentRequestIds.has(alum._id);
          return (
            <div key={alum._id} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <h2 className="text-xl font-bold text-blue-600">{alum.name}</h2>
              <p className="text-md font-semibold text-gray-700">{alum.jobTitle || 'N/A'}</p>
              <p className="text-sm text-gray-500">{alum.currentCompany || 'N/A'}</p>
              <div className="mt-auto pt-4">
                <button 
                  onClick={() => !isRequested && setSelectedAlumnus(alum)}
                  disabled={isRequested}
                  className={`w-full font-bold py-2 rounded-lg transition ${
                    isRequested 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isRequested ? 'Request Sent' : 'Send Request'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedAlumnus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-2">Send Request to {selectedAlumnus.name}</h2>
            <p className="text-gray-600 mb-4">Write a brief message about what you'd like to discuss.</p>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSendRequest}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Hello, I'm a student in my 3rd year..."
                required
              ></textarea>
              <div className="flex justify-end space-x-4 mt-6">
                <button 
                  type="button" 
                  onClick={() => setSelectedAlumnus(null)}
                  className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg flex items-center"
                >
                  <Send size={18} className="mr-2" />
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindMentorPage;