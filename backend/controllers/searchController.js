const User = require('../models/User');
const Job = require('../models/Job');
const Post = require('../models/Post');

// @desc    Perform a sitewide search
// @route   GET /api/search?q=query
const performSearch = async (req, res) => {
  const query = req.query.q || '';
  if (!query) {
    return res.json({ alumni: [], jobs: [], posts: [] });
  }

  // Create a case-insensitive regex for searching
  const regex = new RegExp(query, 'i');

  try {
    const [alumni, jobs, posts] = await Promise.all([
      // Search for alumni by name, job title, or company
      User.find({ role: 'alumni', $or: [{ name: regex }, { jobTitle: regex }, { currentCompany: regex }] }).select('-password'),
      // Search for jobs by title or company
      Job.find({ $or: [{ title: regex }, { company: regex }] }).populate('postedBy', 'name'),
      // Search for posts by content
      Post.find({ content: regex }).populate('user', 'name')
    ]);

    res.json({ alumni, jobs, posts });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { performSearch };