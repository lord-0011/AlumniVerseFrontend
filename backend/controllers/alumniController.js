const User = require('../models/User.js');

/**
 * @desc    Get all alumni profiles
 * @route   GET /api/alumni
 * @access  Private (Students only)
 */
const getAllAlumni = async (req, res) => {
  // Check if the logged-in user is a student
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Forbidden: Only students can access this resource.' });
  }

  try {
    // Find all users with the role 'alumni'
    const alumni = await User.find({ role: 'alumni' }).select(
      '-password -email' // Exclude sensitive fields
    );
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getAllAlumni };