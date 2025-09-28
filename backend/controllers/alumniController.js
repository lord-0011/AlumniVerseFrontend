const User = require('../models/User.js');
const Job = require('../models/Job');
const MentorshipRequest = require('../models/MentorshipRequest');
const Event = require('../models/Event');

/**
 * @desc    Get all alumni profiles
 * @route   GET /api/alumni
 * @access  Private (Students only)
 */
const getAllAlumni = async (req, res) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Forbidden: Only students can access this resource.' });
  }
  try {
    const alumni = await User.find({ role: 'alumni' }).select('-password -email');
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Get stats and data for the alumni dashboard
 * @route   GET /api/alumni/dashboard
 * @access  Private (Alumni only)
 */
const getDashboardStats = async (req, res) => {
  try {
    const alumniId = req.user._id;
    const jobsPostedCount = await Job.countDocuments({ postedBy: alumniId });
    const menteesCount = await MentorshipRequest.countDocuments({ alumni: alumniId, status: 'accepted' });
    
    // NEW: Count pending mentorship requests
    const pendingRequestsCount = await MentorshipRequest.countDocuments({
      alumni: alumniId,
      status: 'pending'
    });

    const upcomingEvents = await Event.find({ date: { $gte: new Date() } }).sort({ date: 1 }).limit(2);

    res.json({
      jobsPosted: jobsPostedCount,
      mentees: menteesCount,
      pendingRequests: pendingRequestsCount, // Add to response
      upcomingEvents,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getAllAlumni, getDashboardStats };