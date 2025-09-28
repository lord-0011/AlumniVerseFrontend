import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import { getPosts, createPost } from '../api';

const FeedPage = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  // Fetch posts when the component loads
  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const fetchedPosts = await getPosts(token);
          if (Array.isArray(fetchedPosts)) {
            setPosts(fetchedPosts);
          } else {
            setPosts([]);
          }
        } catch (err) {
          setError('Could not fetch posts.');
        }
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async (postData) => {
    // This is the checkpoint to see if the function is being called
    console.log('--- Step 2: handleCreatePost in FeedPage was called! ---');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to post.');
      return;
    }
    try {
      const newPost = await createPost(token, postData);
      setPosts([newPost, ...posts]);
    } catch (err) {
      setError('Failed to create post.');
    }
  };

  return (
    <>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <CreatePost user={user} onPost={handleCreatePost} />
      <div className="feed">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

export default FeedPage;