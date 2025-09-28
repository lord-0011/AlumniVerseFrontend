const Post = require("../models/Post.js");
const User = require('../models/User'); // Import User model
/**
 * @desc    Create a new post
 * @route   POST /api/posts
 * @access  Private
 */
const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = new Post({
      content,
      user: req.user._id,
      likes: [],
      comments: [],
    });

    // If an image was uploaded, add its URL to the post
    if (req.file) {
      post.image = req.file.path;
    }

    const createdPost = await post.save();
    await createdPost.populate('user', 'name role');
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
/**
 * @desc    Fetch all posts
 * @route   GET /api/posts
 * @access  Private
 */
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("user", "name role")
      .sort({ createdAt: -1 });
    return res.json(posts);
  } catch (err) {
    console.error("Get posts error:", err.message);
    return res.status(500).json({ message: "Server error fetching posts" });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the post has already been liked by this user
    if (post.likes.includes(req.user.id)) {
      // Already liked, so unlike it
      post.likes = post.likes.filter(userId => userId.toString() !== req.user.id);
    } else {
      // Not liked, so like it
      post.likes.push(req.user.id);
    }
    await post.save();
    res.json(post.likes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Comment on a post
// @route   POST /api/posts/:id/comment
const commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = {
      text: req.body.text,
      user: req.user.id,
    };

    post.comments.push(newComment);
    await post.save();
    
    // Populate the user details for the new comment before sending back
    const createdComment = post.comments[post.comments.length - 1];
    await Post.populate(createdComment, { path: 'user', select: 'name' });

    res.status(201).json(createdComment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name');
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createPost, getPosts, likePost, commentOnPost,getPostById };