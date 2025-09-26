import React, { useState, useEffect } from 'react';
import { getReceivedRequests, updateRequestStatus } from '../api'; // or '../api.js'
import { UserCheck, UserX, Users } from 'lucide-react';

const MentorshipRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // 1. Get the token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You must be logged in to view this page.');
          setLoading(false);
          return;
        }
        
        // 2. Pass the token to the API function
        const data = await getReceivedRequests(token);
        setRequests(data);
      } catch (err) {
        setError('Could not fetch mentorship requests.');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (requestId, status) => {
    try {
      // Also pass the token here for the update action
      const token = localStorage.getItem('token');
      await updateRequestStatus(token, requestId, status);
      setRequests(requests.filter(req => req._id !== requestId));
    } catch (err) {
      alert(`Failed to ${status} request.`);
    }
  };

  if (loading) {
    return <div>Loading requests...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Mentorship Requests</h1>
        <p className="text-gray-600 mt-2">Review and respond to requests from students.</p>
      </div>

      {error && <p className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>}
      
      <div className="space-y-4">
        {requests.length > 0 ? (
          requests.map(req => (
            <div key={req._id} className="bg-white p-5 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="font-bold text-lg text-gray-800">{req.student.name}</p>
                <p className="text-sm text-gray-600">{req.student.collegeName} - {req.student.major}</p>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => handleUpdateStatus(req._id, 'accepted')}
                  className="bg-green-500 text-white font-bold p-2 rounded-full hover:bg-green-600 transition"
                  title="Accept"
                >
                  <UserCheck size={20} />
                </button>
                <button 
                  onClick={() => handleUpdateStatus(req._id, 'rejected')}
                  className="bg-red-500 text-white font-bold p-2 rounded-full hover:bg-red-600 transition"
                  title="Reject"
                >
                  <UserX size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white text-center p-12 rounded-lg shadow-md">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-700">No Pending Requests</h3>
            <p className="mt-1 text-gray-500">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorshipRequestsPage;