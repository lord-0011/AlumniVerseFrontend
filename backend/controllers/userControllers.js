const User = require('../models/User.js');
const Connection = require('../models/Connection'); // <-- ADD THIS
const MentorshipRequest = require('../models/MentorshipRequest');

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */

const getAlumni = async (req, res) => {
  try {
    const alumni = await User.find({ role: 'alumni' }).select('-password');
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getUserProfile = async (req, res) => {
  // The user is already found by the 'protect' middleware and attached to req.user
  const user = req.user;
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};


/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = async (req, res) => {
  // ... (This function remains the same as before)
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.collegeName = req.body.collegeName || user.collegeName;

    if (user.role === 'alumni') {
      user.graduationYear = req.body.graduationYear || user.graduationYear;
      user.currentCompany = req.body.currentCompany || user.currentCompany;
      user.jobTitle = req.body.jobTitle || user.jobTitle;
    } else {
      user.expectedGraduationYear = req.body.expectedGraduationYear || user.expectedGraduationYear;
      user.major = req.body.major || user.major;
      user.careerGoals = req.body.careerGoals || user.careerGoals;
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const checkUserStatus = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const profileUserId = req.params.profileUserId;
    const loggedInUserRole = req.user.role;

    let relationship = { status: 'none' };

    if (loggedInUserRole === 'alumni') {
      // Check for an alumni-alumni connection
      const connection = await Connection.findOne({
        $or: [
          { requester: loggedInUserId, recipient: profileUserId },
          { requester: profileUserId, recipient: loggedInUserId },
        ],
      });
      if (connection) {
        relationship = { status: connection.status, id: connection._id, type: 'connection' };
      }
    } else if (loggedInUserRole === 'student') {
      // Check for a student-alumni mentorship
      const mentorship = await MentorshipRequest.findOne({
        student: loggedInUserId,
        alumni: profileUserId,
      });
      if (mentorship) {
        relationship = { status: mentorship.status, id: mentorship._id, type: 'mentorship' };
      }
    }
    
    res.json(relationship);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { updateUserProfile, getUserProfile, getAlumni,getUserById,checkUserStatus };