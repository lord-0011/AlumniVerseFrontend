import React, { useState, useEffect, useMemo } from 'react';
import { getAlumniDirectory, sendConnectionRequest } from '../api';
import { Search, Briefcase, UserPlus } from 'lucide-react';

const AlumniDirectoryPage = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [requestedIds, setRequestedIds] = useState(new Set());

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getAlumniDirectory(token);
        setAlumni(data);
      } catch (error) {
        console.error("Failed to fetch alumni directory", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, []);

  const handleConnect = async (recipientId) => {
    try {
      const token = localStorage.getItem('token');
      await sendConnectionRequest(token, recipientId);
      setRequestedIds(prev => new Set(prev).add(recipientId));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send request.");
    }
  };

  const filteredAlumni = useMemo(() => {
    return alumni.filter(alum =>
      alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (alum.jobTitle && alum.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [alumni, searchTerm]);

  if (loading) return <div>Loading directory...</div>;

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Alumni Directory</h1>
        <p className="text-gray-600 mt-2">Find and connect with fellow alumni.</p>
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
          const isRequested = requestedIds.has(alum._id);
          const buttonStatus = isRequested ? 'pending' : 'connect';

          return (
            <div key={alum._id} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col">
              <img 
                src={`https://i.pravatar.cc/150?u=${alum.name}`} 
                alt={alum.name} 
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-blue-600">{alum.name}</h2>
              <p className="text-sm text-gray-500">Class of {alum.graduationYear}</p>
              <div className="flex items-center justify-center text-gray-700 mt-2">
                <Briefcase size={16} className="mr-2" />
                <p>{alum.jobTitle} at {alum.currentCompany}</p>
              </div>
              <div className="mt-auto pt-4">
                {buttonStatus === 'connect' && (
                  <button 
                    onClick={() => handleConnect(alum._id)} 
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
                  >
                    <UserPlus size={18} className="mr-2" /> Connect
                  </button>
                )}
                {buttonStatus === 'pending' && (
                  <button 
                    disabled 
                    className="w-full bg-gray-300 text-gray-500 font-bold py-2 rounded-lg cursor-not-allowed"
                  >
                    Request Sent
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default AlumniDirectoryPage;