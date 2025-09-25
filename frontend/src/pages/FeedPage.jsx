import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import { getPosts, createPost } from "../api";

const FeedPage = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  // Load posts from backend on mount
  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const fetched = await getPosts(token);
        if (Array.isArray(fetched)) setPosts(fetched);
      } catch (e) {
        setError(e.message || "Could not fetch posts");
      }
    };
    fetchPosts();
  }, []);

  // Called by CreatePost
  const handleCreatePost = async (postData) => {
    // Optional debug checkpoint
    console.log("--- Step 2: handleCreatePost in FeedPage was called! ---");
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to post.");
      return;
    }
    try {
      const created = await createPost(token, postData);
      setPosts((prev) => [created, ...prev]);
    } catch (e) {
      setError(e.message || "Failed to create post");
    }
  };

  return (
    <>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <CreatePost user={user} onPost={handleCreatePost} />
      <div className="feed">
        {posts.map((post) => (
          <Post key={post._id || post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default FeedPage;