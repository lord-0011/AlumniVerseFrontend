import React, { useState, useEffect } from 'react';
import { getPosts, createPost, likePost, commentOnPost } from '../api';
import Post from '../components/Post'; // We'll create this component next

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

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
    if (!content.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const newPost = await createPost(token, { content });
      // To show user details, we might need to adjust the backend response or fetch again
      // For now, let's prepend it simply and plan to refresh or get the populated post back
      setPosts([newPost, ...posts]);
      setContent('');
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };
  
  // You would pass these functions down to the Post component
  
  if (loading) return <div>Loading feed...</div>;
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Create Post Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <form onSubmit={handleCreatePost}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="What's on your mind?"
          />
          <button type="submit" className="mt-2 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg">
            Post
          </button>
        </form>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {posts.map(post => (
          <Post key={post._id} postData={post} />
        ))}
      </div>
    </div>
  );
};

export default FeedPage;