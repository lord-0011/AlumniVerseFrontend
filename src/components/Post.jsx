import React, { useState, useEffect } from 'react';
import { ThumbsUp, MessageCircle, Share2, UserPlus, MoreVertical, Trash2 } from 'lucide-react';
import { 
  likePost, 
  commentOnPost, 
  deletePost, 
  checkUserStatus, 
  sendConnectionRequest, 
  createMentorshipRequest 
} from '../api';
import ChatModal from './ChatModal';

const Post = ({ postData, onDelete }) => {
  const [post, setPost] = useState(postData);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [relationship, setRelationship] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const currentUserId = localStorage.getItem('userId');
  const currentUserRole = localStorage.getItem('userRole');
  const currentUserName = localStorage.getItem('userName');
  const currentUserProfilePicture = localStorage.getItem('userProfilePicture');

  // Fetch relationship status with post author
  useEffect(() => {
    const fetchStatus = async () => {
      if (post.user._id !== currentUserId) {
        try {
          const token = localStorage.getItem('token');
          const statusData = await checkUserStatus(token, post.user._id);
          setRelationship(statusData);
        } catch (error) {
          console.error("Failed to fetch user status", error);
        }
      }
    };
    fetchStatus();
  }, [post.user._id, currentUserId]);

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
      setPost({ 
        ...post, 
        comments: [...(post.comments || []), {
          ...newComment,
          user: {
            ...newComment.user,
            profilePicture: newComment.user.profilePicture || `https://i.pravatar.cc/150?u=${newComment.user._id}`
          }
        }]
      });
      setCommentText('');
    } catch (error) {
      console.error('Failed to add comment', error);
    }
  };

  const handleConnect = async () => {
    try {
      const token = localStorage.getItem('token');
      if (currentUserRole === 'alumni') {
        await sendConnectionRequest(token, post.user._id);
      } else if (currentUserRole === 'student') {
        await createMentorshipRequest(token, post.user._id, "I saw your post and would like to request mentorship.");
      }
      setRelationship({ status: 'pending' });
    } catch (error) {
      alert("Failed to send request.");
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const token = localStorage.getItem('token');
      await deletePost(token, post._id);
      onDelete(post._id);
    } catch (error) {
      console.error('Failed to delete post', error);
      alert('Failed to delete post.');
    }
  };

  const renderActionButton = () => {
    if (post.user._id === currentUserId) return null;

    if (relationship?.status === 'accepted') {
      const chatConnection = {
        _id: relationship.id,
        requester: { _id: currentUserId, name: currentUserName },
        recipient: { _id: post.user._id, name: post.user.name }
      };
      return (
        <button 
          onClick={() => setActiveChat(chatConnection)} 
          className="ml-auto bg-green-500 text-white font-bold text-xs py-1 px-3 rounded-full flex items-center"
        >
          <MessageCircle size={14} className="mr-1" /> Message
        </button>
      );
    }

    if (relationship?.status === 'pending') {
      return <button disabled className="ml-auto bg-gray-300 text-gray-500 font-bold text-xs py-1 px-3 rounded-full">Request Sent</button>;
    }

    if (relationship?.status === 'none') {
      const buttonText = currentUserRole === 'alumni' ? 'Connect' : 'Request Mentorship';
      return (
        <button 
          onClick={handleConnect} 
          className="ml-auto bg-blue-600 text-white font-bold text-xs py-1 px-3 rounded-full flex items-center"
        >
          <UserPlus size={14} className="mr-1" /> {buttonText}
        </button>
      );
    }

    return null;
  };

  const isLiked = (post.likes || []).includes(currentUserId);
  const likeCount = (post.likes || []).length;
  const commentCount = (post.comments || []).length;
  const authorProfilePicture = post.user.profilePicture || `https://i.pravatar.cc/150?u=${post.user._id}`;

  return (
    <>
      <div className="bg-white p-5 rounded-lg shadow-md">
        {/* Post Header */}
        <div className="flex items-center mb-4">
          <img
            src={authorProfilePicture}
            alt="avatar"
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
          <div>
            <span className="font-bold text-gray-800">{post.user.name}</span>
            <div className="text-sm text-gray-500">{new Date(post.createdAt).toDateString()}</div>
          </div>

          {/* Post author delete menu */}
          {currentUserId === post.user._id && (
            <div className="relative ml-auto">
              <button onClick={() => setShowMenu(!showMenu)} className="p-2 rounded-full hover:bg-gray-100">
                <MoreVertical size={20} />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-10" onMouseLeave={() => setShowMenu(false)}>
                  <button onClick={handleDeletePost} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    <Trash2 size={16} className="mr-2" /> Delete Post
                  </button>
                </div>
              )}
            </div>
          )}

          {renderActionButton()}
        </div>

        {/* Post Content */}
        <p className="text-gray-800 mb-4">{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt="Post content"
            className="rounded-lg w-full max-h-[400px] object-cover mb-4"
          />
        )}

        {/* Stats */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span>{likeCount > 0 && `👍 ${likeCount} Likes`}</span>
          <span 
            onClick={() => setShowComments(!showComments)} 
            className="cursor-pointer hover:underline"
          >
            {commentCount > 0 && `${commentCount} Comments`}
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-around border-t py-2">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 text-sm font-semibold p-2 rounded-md w-full justify-center transition ${isLiked ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
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
            onClick={() => navigator.share ? navigator.share({title:`Post by ${post.user.name}`, text:post.content,url:window.location.href}) : alert('Sharing not supported')}
            className="flex items-center space-x-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-800 p-2 rounded-md w-full justify-center transition"
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>

        {/* Comments */}
        {showComments && (
          <div className="mt-4 space-y-3">
            <form onSubmit={handleComment} className="flex space-x-2">
              <img
                src={currentUserProfilePicture || `https://i.pravatar.cc/150?u=${currentUserId}`}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
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
                <img
                  src={comment.user.profilePicture || `https://i.pravatar.cc/150?u=${comment.user._id}`}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="bg-gray-100 p-2 rounded-lg w-full">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold">{comment.user.name}</p>
                    <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                  </div>
                  <p className="text-sm mt-1">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Modal */}
      {activeChat && (
        <ChatModal 
          user={{ name: currentUserName, type: currentUserRole }}
          connection={activeChat}
          onClose={() => setActiveChat(null)} 
        />
      )}
    </>
  );
};

export default Post;
