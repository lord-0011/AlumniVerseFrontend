import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { likePost, commentOnPost } from '../api';

const Post = ({ postData }) => {
  const [post, setPost] = useState(postData);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  // ✅ Correctly get userId from localStorage
  const currentUserId = localStorage.getItem('userId');

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const updatedLikes = await likePost(token, post._id);
      setPost({ ...post, likes: updatedLikes });
    } catch (error) {
      console.error('Failed to like post', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const newComment = await commentOnPost(token, post._id, commentText);
      setPost({ ...post, comments: [...(post.comments || []), newComment] });
      setCommentText('');
    } catch (error) {
      console.error('Failed to add comment', error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Post by ${post.user.name}`,
        text: post.content,
        url: window.location.href,
      });
    } else {
      alert('Sharing is not supported on your browser.');
    }
  };

  const isLiked = (post.likes || []).includes(currentUserId);
  const likeCount = (post.likes || []).length;
  const commentCount = (post.comments || []).length;
  const comments = post.comments || [];

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      {/* Post Header */}
      <div className="flex items-center mb-4">
        <img
          src={`https://i.pravatar.cc/150?u=${post.user._id}`}
          alt="avatar"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <span className="font-bold text-gray-800">{post.user.name}</span>
          <div className="text-sm text-gray-500">
            {new Date(post.createdAt).toDateString()}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 mb-4">{post.content}</p>

      {/* Post Stats */}
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>{likeCount} Likes</span>
        <span>{commentCount} Comments</span>
      </div>

      {/* Post Actions */}
      <div className="flex justify-around border-t border-b py-2">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg w-full justify-center transition ${
            isLiked ? 'text-blue-600 font-semibold' : 'text-gray-600'
          }`}
        >
          <ThumbsUp size={20} />
          <span>{isLiked ? 'Liked' : 'Like'}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg w-full justify-center text-gray-600"
        >
          <MessageCircle size={20} />
          <span>Comment</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg w-full justify-center text-gray-600"
        >
          <Share2 size={20} />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 space-y-3">
          <form onSubmit={handleComment} className="flex space-x-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="w-full bg-gray-100 p-2 rounded-lg border"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Send
            </button>
          </form>
          {comments.map((comment) => (
            <div key={comment._id} className="bg-gray-100 p-2 rounded-lg">
              <p className="text-sm font-bold">{comment.user.name}</p>
              <p className="text-sm">{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
