import React, { useState, useEffect, useMemo } from 'react';
import { Search, Send } from 'lucide-react';
import { getAllAlumni, createMentorshipRequest } from '../api';

const AlumniListPage = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [requestStatus, setRequestStatus] = useState({}); // To track sent requests

  useEffect(() => {
    const fetchAlumni = async () => {
      const token = localStorage.getItem('token');
      try {
        const data = await getAllAlumni(token);
        setAlumniList(data);
      } catch (err) {
        setError('Could not fetch alumni data.');
      }
    };
    fetchAlumni();
  }, []);

  const filteredAlumni = useMemo(() => {
    if (!searchTerm) return alumniList;
    return alumniList.filter(alumnus =>
      alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (alumnus.jobTitle && alumnus.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (alumnus.currentCompany && alumnus.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, alumniList]);

  const handleRequest = async (alumniId, alumniName) => {
    const token = localStorage.getItem('token');
    setRequestStatus({ ...requestStatus, [alumniId]: 'Sending...' });
    try {
      const res = await createMentorshipRequest(token, alumniId);
      if (res.message.includes('successfully')) {
        setRequestStatus({ ...requestStatus, [alumniId]: 'Sent!' });
        alert(`Mentorship request sent to ${alumniName}!`);
      } else {
        // Handle backend errors like "already have a pending request"
        setRequestStatus({ ...requestStatus, [alumniId]: 'Failed' });
        alert(`Error: ${res.message}`);
      }
    } catch (err) {
      setRequestStatus({ ...requestStatus, [alumniId]: 'Failed' });
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header and Search */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Alumni Directory</h1>
        <p className="text-gray-600 mt-2">Find and connect with experienced alumni for mentorship.</p>
        <div className="mt-6 relative">
          <input
            type="text"
            placeholder="Search by name, company, or job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Alumni Grid */}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map(alumnus => {
          const status = requestStatus[alumnus._id];
          return (
            <div key={alumnus._id} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <div className="flex items-center mb-4">
                <img src={`https://i.pravatar.cc/150?u=${alumnus.name}`} alt="avatar" className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{alumnus.name}</h2>
                  <p className="text-sm text-blue-600 font-semibold">{alumnus.jobTitle || 'N/A'}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Company:</strong> {alumnus.currentCompany || 'N/A'}</p>
                <p><strong>Graduated:</strong> {alumnus.graduationYear || 'N/A'}</p>
                <p><strong>College:</strong> {alumnus.collegeName || 'N/A'}</p>
              </div>
              <button 
                onClick={() => handleRequest(alumnus._id, alumnus.name)}
                disabled={status === 'Sending...' || status === 'Sent!'} // Disable button after action
                className="w-full mt-auto pt-4 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center disabled:bg-gray-400"
              >
                <Send size={16} className="mr-2"/> 
                {status || 'Send Request'} {/* Show status on button */}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default AlumniListPage;