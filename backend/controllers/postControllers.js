const Post = require('../models/Post.js');

/**
 * @desc    Create a new post
 * @route   POST /api/posts
 * @access  Private
 */
const createPost = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }

  const post = new Post({
    content,
    user: req.user._id, // The user ID comes from the 'protect' middleware
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
};

/**
 * @desc    Fetch all posts
 * @route   GET /api/posts
 * @access  Private
 */
const getPosts = async (req, res) => {
  const posts = await Post.find({})
    .populate('user', 'name role') // Populate with user's name and role
    .sort({ createdAt: -1 }); // Show newest posts first

  res.json(posts);
};

module.exports = { createPost, getPosts };