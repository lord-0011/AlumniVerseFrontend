import React from 'react';

const Post = ({ post }) => {
  // Destructure with the new data structure from the backend
  const { user, createdAt, content, image, likes, comments } = post;

  // Handle cases where user might not be populated yet
  const authorName = user ? user.name : 'Anonymous';
  const authorRole = user ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User';

  const roleColor = authorRole === 'Alumni' ? 'text-blue-600' : 'text-green-500';

  // Format the timestamp
  const timestamp = new Date(createdAt).toLocaleString();

  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-6">
      {/* Post Header */}
      <div className="flex items-center mb-4">
        <img src={`https://i.pravatar.cc/150?u=${authorName}`} alt="avatar" className="w-12 h-12 rounded-full mr-4" />
        <div>
          <span className="font-bold text-gray-800">{authorName}</span>
          <div className="text-sm text-gray-500">
            <span className={`font-medium ${roleColor}`}>{authorRole}</span> · <span>{timestamp}</span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 mb-4">{content}</p>
      {image && <img src={image} alt="Post media" className="rounded-lg w-full max-h-96 object-cover" />}

      {/* Post Footer with actions */}
      <div className="flex justify-around border-t border-gray-200 pt-3 mt-4">
        <button className="text-gray-600 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg w-full text-center transition">
          👍 Like ({likes})
        </button>
        <button className="text-gray-600 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg w-full text-center transition">
          💬 Comment ({comments})
        </button>
        <button className="text-gray-600 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg w-full text-center transition">
          🔗 Share
        </button>
      </div>
    </div>
  );
};

export default Post;