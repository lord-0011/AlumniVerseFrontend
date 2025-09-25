import React, { useState } from 'react';

const CreatePost = ({ user, onPost }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    // V-- ADD THIS CHECKPOINT --V
    console.log('--- Step 1: handleSubmit in CreatePost was called! ---');
    // ^--                       --^

    e.preventDefault();
    if (!content.trim()) return;

    onPost({ content });

    setContent('');
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit}>
        {/* ... rest of the component is the same ... */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          rows="3"
          placeholder={`What's on your mind, ${user.type}?`}
        />
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;