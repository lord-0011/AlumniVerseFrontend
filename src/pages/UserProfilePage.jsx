import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById, checkUserStatus, sendConnectionRequest, createMentorshipRequest } from '../api';
import { Briefcase, GraduationCap, UserPlus, MessageCircle } from 'lucide-react';
import ChatModal from '../components/ChatModal';

const UserProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relationship, setRelationship] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const { id } = useParams();
  
  const currentUserRole = localStorage.getItem('userRole');
  const currentUserName = localStorage.getItem('userName');
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProfileData = async () => {
      if (id === currentUserId) {
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const [profileData, statusData] = await Promise.all([
          getUserById(token, id),
          checkUserStatus(token, id)
        ]);
        setProfile(profileData);
        setRelationship(statusData);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [id, currentUserId]);
  
  const handleConnect = async () => {
    try {
      const token = localStorage.getItem('token');
      if (currentUserRole === 'alumni') {
        await sendConnectionRequest(token, id);
        setRelationship({ status: 'pending' });
      } else if (currentUserRole === 'student') {
        await createMentorshipRequest(token, id, "I'd like to request mentorship.");
        setRelationship({ status: 'pending' });
      }
    } catch (error) {
      alert("Failed to send request.");
    }
  };

  const handleOpenChat = () => {
    let chatConnection;
    if (relationship.type === 'mentorship') {
        chatConnection = { _id: relationship.id, student: profile, alumni: profile };
    } else {
        chatConnection = { _id: relationship.id, requester: profile, recipient: profile };
    }
    setActiveChat(chatConnection);
  };

  const renderActionButton = () => {
    if (id === currentUserId) return null;

    if (relationship?.status === 'accepted') {
      return (
        <button 
          onClick={handleOpenChat} 
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg flex items-center"
        >
          <MessageCircle size={18} className="mr-2" /> Message
        </button>
      );
    }
    if (relationship?.status === 'pending') {
      return <button disabled className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-lg">Request Sent</button>;
    }
    
    // THIS IS THE CORRECTED LOGIC
    if (relationship?.status === 'none' && profile.role === 'alumni') {
      const buttonText = currentUserRole === 'alumni' ? 'Connect' : 'Request Mentorship';
      return (
        <button onClick={handleConnect} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
          <UserPlus size={18} className="mr-2" /> {buttonText}
        </button>
      );
    }
    return null;
  };

  if (loading) return <div>Loading profile...</div>;
  if (!profile && id !== currentUserId) return <div>Profile not found.</div>;
  
  if (id === currentUserId) {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
             <h1 className="text-3xl font-bold text-gray-800">This is your own profile view.</h1>
             <p className="text-gray-600 mt-2">To see the public view, log in with another account and navigate here.</p>
        </div>
    )
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-6">
              <img
                className="h-24 w-24 rounded-full"
                src={profile.profilePicture || `https://i.pravatar.cc/150?u=${profile.name}`}
                alt="Profile Avatar"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
                <p className="text-lg text-gray-500 capitalize">{profile.role}</p>
              </div>
            </div>
            {renderActionButton()}
          </div>
          <div className="border-t pt-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Details</h2>
            {profile.role === 'alumni' ? (
              <>
                <div className="flex items-center">
                  <Briefcase size={20} className="text-gray-500 mr-3" />
                  <span>Works as a {profile.jobTitle} at <strong>{profile.currentCompany}</strong></span>
                </div>
                <div className="flex items-center">
                  <GraduationCap size={20} className="text-gray-500 mr-3" />
                  <span>Graduated from {profile.collegeName} in {profile.graduationYear}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <Briefcase size={20} className="text-gray-500 mr-3" />
                  <span>Studies {profile.major} at <strong>{profile.collegeName}</strong></span>
                </div>
                <div className="flex items-center">
                  <GraduationCap size={20} className="text-gray-500 mr-3" />
                  <span>Expected to graduate in {profile.expectedGraduationYear}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {activeChat && (
        <ChatModal 
          user={{ name: currentUserName, type: currentUserRole }}
          connection={activeChat}
          onClose={() => setActiveChat(null)} 
        />
      )}
    </>
  );
};

export default UserProfilePage;