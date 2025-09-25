import React, { useState, useEffect } from 'react';
import { getReceivedRequests, updateRequestStatus } from '../api';
import { UserCheck, UserX } from 'lucide-react';

const MentorshipRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem('token');
      try {
        const data = await getReceivedRequests(token);
        setRequests(data);
      } catch (err) {
        setError('Could not fetch mentorship requests.');
      }
    };
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (requestId, status) => {
    const token = localStorage.getItem('token');
    try {
      await updateRequestStatus(token, requestId, status);
      // Remove the handled request from the list
      setRequests(requests.filter(req => req._id !== requestId));
    } catch (err) {
      alert(`Failed to ${status} request.`);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Mentorship Requests</h1>
        <p className="text-gray-600 mt-2">Review and respond to requests from students.</p>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      
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
          <div className="bg-white text-center p-8 rounded-lg shadow-md">
            <p className="text-gray-600">You have no pending mentorship requests.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorshipRequestsPage;