import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, MessageCircle } from 'lucide-react';
import ChatModal from '../components/ChatModal'; // Make sure to import your ChatModal component
import { BASE_URL } from '../api';

const MyMentorshipsPage = () => {
  const [mentorships, setMentorships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State to manage which chat connection is currently open
  const [activeChat, setActiveChat] = useState(null);

  // Get user info from localStorage to pass to the chat modal
  const userRole = localStorage.getItem('userRole');
  const userName = localStorage.getItem('userName');
  const isAlumni = userRole === 'alumni';

  useEffect(() => {
    const fetchMentorships = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const endpoint = isAlumni ? `${BASE_URL}/mentorship/my-mentees` : `${BASE_URL}/mentorship/my-mentors`;
        const { data } = await axios.get(endpoint, config);
        
        setMentorships(data);
      } catch (err) {
        setError('Could not fetch mentorship connections.');
      } finally {
        setLoading(false);
      }
    };
    fetchMentorships();
  }, [isAlumni]);

  if (loading) {
    return (
      <div className="text-center p-12">
        <p className="text-gray-600">Loading your mentorship connections...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">My Mentorships</h1>
        <p className="text-gray-600 mt-2">
          {isAlumni ? 'Here are the students you are currently mentoring.' : 'Here are your current mentors.'}
        </p>
      </div>
      
      {error && <p className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>}

      <div className="space-y-6">
        {mentorships.length > 0 ? (
          mentorships.map(item => (
            <div key={item._id} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
              {isAlumni ? (
                // Alumni view: Show mentee details
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{item.student.name}</h2>
                  <p className="text-gray-600">{item.student.major} - Class of {item.student.expectedGraduationYear}</p>
                  <a href={`mailto:${item.student.email}`} className="text-blue-600 hover:underline">
                    {item.student.email}
                  </a>
                </div>
              ) : (
                // Student view: Show mentor details
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{item.alumni.name}</h2>
                  <p className="text-gray-600">{item.alumni.jobTitle} at {item.alumni.currentCompany}</p>
                  <a href={`mailto:${item.alumni.email}`} className="text-blue-600 hover:underline">
                    {item.alumni.email}
                  </a>
                </div>
              )}
              
              <button 
                onClick={() => setActiveChat(item)} // This opens the modal
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition flex items-center"
              >
                <MessageCircle size={18} className="mr-2" />
                Message
              </button>
            </div>
          ))
        ) : (
          <div className="bg-white text-center p-12 rounded-lg shadow-md">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-700">No Active Connections</h3>
            <p className="mt-1 text-gray-500">
              {isAlumni ? 'Accept some mentorship requests to get started.' : 'Find a mentor to get started.'}
            </p>
          </div>
        )}
      </div>

      {/* Conditionally render the ChatModal when a chat is active */}
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

export default MyMentorshipsPage;