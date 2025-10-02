import React, { useState, useEffect } from 'react';
import { getConversations } from '../api';
import ChatWindow from '../components/ChatWindow'; // We'll create this from ChatModal

const MessagesPage = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getConversations(token);
        setConversations(data);
      } catch (error) {
        console.error("Failed to fetch conversations", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white rounded-lg shadow-md">
      {/* Left Sidebar: Conversations List */}
      <div className="w-1/3 border-r flex flex-col">
        <header className="p-4 border-b">
          <h1 className="text-xl font-bold">Conversations</h1>
        </header>
        <div className="flex-grow overflow-y-auto">
          {conversations.map(conv => {
            const otherUser = conv.type === 'mentorship'
              ? (conv.student._id === currentUserId ? conv.alumni : conv.student)
              : (conv.requester._id === currentUserId ? conv.recipient : conv.requester);
            
            return (
              <div
                key={conv._id}
                onClick={() => setActiveConversation(conv)}
                className={`p-4 cursor-pointer hover:bg-gray-100 ${activeConversation?._id === conv._id ? 'bg-blue-50' : ''}`}
              >
                <p className="font-bold">{otherUser.name}</p>
                <p className="text-sm text-gray-500 truncate">Last message preview...</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Side: Active Chat Window */}
      <div className="w-2/3">
        {activeConversation ? (
          <ChatWindow connection={activeConversation} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;