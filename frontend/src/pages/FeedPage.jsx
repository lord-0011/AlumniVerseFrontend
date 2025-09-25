// src/pages/FeedPage.js
import React, { useState } from 'react';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import { mockPosts } from '../mockPosts';

const FeedPage = ({ user }) => {
  const [posts, setPosts] = useState(mockPosts);

  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <>
      <CreatePost user={user} onPost={handleCreatePost} />
      <div className="feed">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default FeedPage;