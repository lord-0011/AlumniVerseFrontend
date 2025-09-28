import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { likePost, commentOnPost } from '../api';

const Post = ({ postData }) => {
  const [post, setPost] = useState(postData);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
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

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      {/* Post Header */}
      <div className="flex items-center mb-4">
        <img src={`https://i.pravatar.cc/150?u=${post.user._id}`} alt="avatar" className="w-12 h-12 rounded-full mr-4" />
        <div>
          <span className="font-bold text-gray-800">{post.user.name}</span>
          <div className="text-sm text-gray-500">{new Date(post.createdAt).toDateString()}</div>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 mb-4">{post.content}</p>
      {post.image && <img src={post.image} alt="Post content" className="rounded-lg w-full max-h-[400px] object-cover mb-4" />}

      {/* Post Stats */}
      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
        <span>{likeCount > 0 && `👍 ${likeCount} Likes`}</span>
        <span onClick={() => setShowComments(!showComments)} className="cursor-pointer hover:underline">
          {commentCount > 0 && `${commentCount} Comments`}
        </span>
      </div>

      {/* Post Actions */}
      <div className="flex justify-around border-t py-2">
        <button 
          onClick={handleLike} 
          className={`flex items-center space-x-2 text-sm font-semibold p-2 rounded-md w-full justify-center transition ${
            isLiked 
              ? 'text-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          <ThumbsUp size={18} />
          <span>Like</span>
        </button>
        <button 
          onClick={() => setShowComments(!showComments)} 
          className="flex items-center space-x-2 text-sm font-semibold text-gray-600 hover:bg-green-50 hover:text-green-600 p-2 rounded-md w-full justify-center transition"
        >
          <MessageCircle size={18} />
          <span>Comment</span>
        </button>
        <button 
          onClick={handleShare} 
          className="flex items-center space-x-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-800 p-2 rounded-md w-full justify-center transition"
        >
          <Share2 size={18} />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 space-y-3">
          <form onSubmit={handleComment} className="flex space-x-2">
            <img src={`https://i.pravatar.cc/150?u=${localStorage.getItem('userName')}`} alt="avatar" className="w-8 h-8 rounded-full" />
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="w-full bg-gray-100 px-3 py-2 rounded-full border focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </form>
          {(post.comments || []).map(comment => (
            <div key={comment._id} className="flex items-start space-x-2">
              <img src={`https://i.pravatar.cc/150?u=${comment.user._id}`} alt="avatar" className="w-8 h-8 rounded-full" />
              <div className="bg-gray-100 p-2 rounded-lg w-full">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold">{comment.user.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm mt-1">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;