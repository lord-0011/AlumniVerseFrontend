import React, { useState, useEffect } from 'react';
import { getPosts, createPost } from '../api';
import Post from '../components/Post';
import { Image as ImageIcon, User } from 'lucide-react';

const FeedPage = ({ user, userName, userProfilePicture }) => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use prop or localStorage for avatar fallback
  const avatarSrc = userProfilePicture 
    || (userName ? `https://i.pravatar.cc/150?u=${userName}` : null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getPosts(token);
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const newPost = await createPost(token, formData);
      setPosts([newPost, ...posts]);
      setContent('');
      setImage(null);
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(p => p._id !== postId));
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Create Post Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex items-start space-x-4">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => e.currentTarget.src = 'https://i.pravatar.cc/150?u=default'}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <User className="text-gray-500" />
            </div>
          )}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border-none rounded-lg focus:ring-0 bg-gray-100 resize-none"
            placeholder={`What's on your mind, ${userName || 'User'}?`}
            rows="2"
          />
        </div>

        <form onSubmit={handleCreatePost} className="flex justify-between items-center mt-4">
          <label className="cursor-pointer text-gray-500 hover:text-blue-600 flex items-center">
            <ImageIcon className="mr-2" /> Add media
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={(e) => setImage(e.target.files[0])} 
            />
          </label>
          <button 
            type="submit" 
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition"
          >
            Post
          </button>
        </form>
        {image && <p className="text-sm text-gray-500 mt-2 pl-16">Selected: {image.name}</p>}
      </div>

      {/* Posts Feed */}
      {loading ? (
        <p>Loading feed...</p>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <Post
              key={post._id}
              postData={post}
              currentUserProfilePicture={avatarSrc} // Pass avatar for each post
              onDelete={handleDeletePost}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedPage;
