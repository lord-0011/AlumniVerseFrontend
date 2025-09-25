const Post = require("../models/Post.js");

/**
 * @desc    Create a new post
 * @route   POST /api/posts
 * @access  Private
 */
const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const post = new Post({
      content,
      user: req.user._id, // The user ID comes from the 'protect' middleware
    });

    const createdPost = await post.save();
    // populate user to keep response shape consistent with GET /api/posts
    await createdPost.populate("user", "name role");
    return res.status(201).json(createdPost);
  } catch (err) {
    console.error("Create post error:", err.message);
    return res.status(500).json({ message: "Server error creating post" });
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

module.exports = { createPost, getPosts };