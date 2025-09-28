import React, { useState, useEffect } from 'react';
import { getConnections, acceptConnectionRequest } from '../api';
import { UserPlus, MessageCircle } from 'lucide-react';
import ChatModal from '../components/ChatModal'; // 1. Import the ChatModal

const ConnectionsPage = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedConnections, setAcceptedConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(null); // 2. Add state for the active chat
  const currentUserId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');
  const userName = localStorage.getItem('userName');

  const fetchConnections = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await getConnections(token);
      
      setPendingRequests(data.filter(c => c.status === 'pending' && c.recipient._id === currentUserId));
      setAcceptedConnections(data.filter(c => c.status === 'accepted'));
    } catch (error) {
      console.error("Failed to fetch connections", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      await acceptConnectionRequest(token, requestId);
      fetchConnections(); // Refresh the lists after accepting
    } catch (error) {
      alert("Failed to accept request.");
    }
  };

  if (loading) return <div>Loading connections...</div>;

  return (
    <div className="space-y-8">
      {/* Pending Requests */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Pending Requests</h1>
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          {pendingRequests.length > 0 ? pendingRequests.map(req => (
            <div key={req._id} className="flex justify-between items-center">
              <div>
                <p className="font-bold">{req.requester.name}</p>
                <p className="text-sm text-gray-500">{req.requester.jobTitle}</p>
              </div>
              <button onClick={() => handleAccept(req._id)} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg">
                Accept
              </button>
            </div>
          )) : <p>No new connection requests.</p>}
        </div>
      </div>

      {/* Accepted Connections */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Your Connections</h1>
        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4">
          {acceptedConnections.length > 0 ? acceptedConnections.map(conn => {
            const otherUser = conn.requester._id === currentUserId ? conn.recipient : conn.requester;
            return (
              <div key={conn._id} className="p-3 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-bold">{otherUser.name}</p>
                  <p className="text-sm text-gray-500">{otherUser.jobTitle}</p>
                </div>
                {/* 3. Add the Message button */}
                <button 
                  onClick={() => setActiveChat(conn)}
                  className="bg-blue-500 text-white font-bold p-2 rounded-full hover:bg-blue-600 transition"
                >
                  <MessageCircle size={20} />
                </button>
              </div>
            )
          }) : <p>You have no connections yet.</p>}
        </div>
      </div>

      {/* 4. Conditionally render the ChatModal */}
      {activeChat && (
        <ChatModal 
          user={{ name: userName, type: userRole }}
          connection={activeChat}
          onClose={() => setActiveChat(null)} 
        />
      )}
    </div>
  );
};

export default ConnectionsPage;