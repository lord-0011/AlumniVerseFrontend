import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { getMessages } from '../api'; 
import { Send, X } from 'lucide-react';

const ChatModal = ({ user, connection, onClose }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);
  const currentUserId = localStorage.getItem('userId');

  // This logic now handles both mentorship and alumni-alumni connections
  let recipient;
  if (connection.student) { // It's a mentorship connection
    recipient = user.type === 'alumni' ? connection.student : connection.alumni;
  } else { // It's an alumni-alumni connection
    recipient = connection.requester._id === currentUserId 
      ? connection.recipient 
      : connection.requester;
  }

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const history = await getMessages(token, connection._id);
        setChatHistory(history);
      } catch (error) {
        console.error("Failed to fetch chat history", error);
      }
    };
    fetchHistory();

    const newSocket = io('https://alumniversebackend.onrender.com', {
      auth: { token: localStorage.getItem('token') }
    });
    setSocket(newSocket);
    newSocket.emit('joinRoom', connection._id);

    newSocket.on('receiveMessage', (data) => {
      setChatHistory(prevHistory => [...prevHistory, data]);
    });

    newSocket.on('connect_error', (err) => {
      console.error("Socket Auth Error:", err.message);
    });

    return () => newSocket.disconnect();
  }, [connection._id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      const messageData = { room: connection._id, message };
      socket.emit('sendMessage', messageData);
      setMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg h-[70vh] flex flex-col">
        <header className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Chat with {recipient.name}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X size={24} /></button>
        </header>
        
        <main className="flex-grow p-4 overflow-y-auto">
          {chatHistory.map((chat) => {
            const isSender = chat.sender._id?.toString() === currentUserId;
            return (
              <div key={chat._id} className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`max-w-xs p-3 rounded-lg ${isSender ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {!isSender && <p className="text-xs font-bold mb-1">{chat.sender.name}</p>}
                  <p>{chat.content}</p>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </main>
        
        <footer className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button type="submit" className="bg-blue-600 text-white font-bold p-3 rounded-lg flex items-center">
              <Send size={20} />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default ChatModal;