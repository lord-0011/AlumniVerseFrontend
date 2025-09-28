const User = require('../models/User.js');
const Job = require('../models/Job');
const MentorshipRequest = require('../models/MentorshipRequest');
const Event = require('../models/Event');
const Connection = require('../models/Connection'); // Added from first snippet

/**
 * @desc    Get all alumni profiles
 * @route   GET /api/alumni
 * @access  Private (Students only)
 */
const getAllAlumni = async (req, res) => {
  // Authorization check: Only students can see the full alumni list
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Forbidden: Only students can access this resource.' });
  }
  try {
    const alumni = await User.find({ role: 'alumni' }).select('-password -email');
    res.json(alumni);
  } catch (error) {
    console.error(error);
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

    // --- Stats from the second snippet ---
    const jobsPostedCount = await Job.countDocuments({ postedBy: alumniId });
    const menteesCount = await MentorshipRequest.countDocuments({ alumni: alumniId, status: 'accepted' });
    const pendingMentorshipRequests = await MentorshipRequest.countDocuments({
      alumni: alumniId,
      status: 'pending'
    });

    // --- Stat from the first snippet (MERGED) ---
    const pendingConnectionRequests = await Connection.countDocuments({
      recipient: alumniId,
      status: 'pending'
    });

    // --- Upcoming Events (Common to both) ---
    const upcomingEvents = await Event.find({ date: { $gte: new Date() } }).sort({ date: 1 }).limit(2);

    // --- Combined JSON Response ---
    res.json({
      jobsPosted: jobsPostedCount,
      mentees: menteesCount,
      pendingMentorships: pendingMentorshipRequests, // Renamed for clarity
      pendingConnections: pendingConnectionRequests, // Added from merge
      upcomingEvents,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Get a directory of other alumni to connect with
 * @route   GET /api/alumni/directory
 * @access  Private (Alumni only)
 */
const getAlumniDirectory = async (req, res) => {
  // Authorization check: Only alumni can see the directory to connect with peers
  if (req.user.role !== 'alumni') {
    return res.status(403).json({ message: 'Forbidden: Only alumni can access this directory.' });
  }
  try {
    // Find all alumni except the currently logged-in user
    const alumni = await User.find({ 
      role: 'alumni', 
      _id: { $ne: req.user._id } // $ne = not equal
    }).select('-password');
    
    res.json(alumni);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { 
  getAllAlumni, 
  getDashboardStats,
  getAlumniDirectory 
};