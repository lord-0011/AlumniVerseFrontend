const MentorshipRequest = require('../models/MentorshipRequest');
const User = require('../models/User'); // Added User model for points system

// @desc    Create a mentorship request
// @route   POST /api/mentorship/request/:alumniId
// @access  Private (Students only)
const createMentorshipRequest = async (req, res) => {
  const alumniId = req.params.alumniId;
  const studentId = req.user._id;

  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Only students can send requests.' });
  }

  // Check for existing requests that are either 'pending' OR 'accepted'
  const existingRequest = await MentorshipRequest.findOne({
    student: studentId,
    alumni: alumniId,
    status: { $in: ['pending', 'accepted'] }
  });

  if (existingRequest) {
    const message = existingRequest.status === 'pending'
      ? 'You already have a pending request with this alumnus.'
      : 'You are already connected with this alumnus.';
    return res.status(400).json({ message });
  }

  try {
    const request = await MentorshipRequest.create({
      student: studentId,
      alumni: alumniId,
      message: req.body.message || '',
    });
    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get mentorship requests sent by the logged-in student
// @route   GET /api/mentorship/sent
// @access  Private (Students only)
const getSentRequests = async (req, res) => {
  try {
    const requests = await MentorshipRequest.find({ 
      student: req.user._id,
    }).populate('alumni', 'name');
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get mentorship requests received by the logged-in alumni
// @route   GET /api/mentorship/received
// @access  Private (Alumni only)
const getReceivedRequests = async (req, res) => {
  if (req.user.role !== 'alumni') {
    return res.status(403).json({ message: 'Not authorized.' });
  }
  try {
    const requests = await MentorshipRequest.find({
      alumni: req.user._id,
      status: 'pending'
    }).populate('student', 'name collegeName major');
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a mentorship request status (accept/reject)
// @route   PUT /api/mentorship/requests/:requestId
// @access  Private (Alumni only)
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'accepted' or 'rejected'
    const request = await MentorshipRequest.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({ message: 'Request not found.' });
    }

    // Ensure the logged-in user is the alumnus who received the request
    if (request.alumni.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized.' });
    }

    // --- MERGED LOGIC ---
    // Award 5 points ONLY when a request's status changes to 'accepted'
    if (status === 'accepted' && request.status !== 'accepted') {
      await User.findByIdAndUpdate(req.user._id, { $inc: { points: 5 } });
    }
    // --- END MERGED LOGIC ---

    request.status = status;
    await request.save();

    res.json({ message: `Request ${status}.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get active mentors for a STUDENT
// @route   GET /api/mentorship/mentors
// @access  Private (Students only)
const getMyMentors = async (req, res) => {
  try {
    const mentorships = await MentorshipRequest.find({ 
      student: req.user._id,
      status: 'accepted'
    }).populate('alumni', 'name jobTitle currentCompany email');
    res.json(mentorships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get active mentees for an ALUMNI
// @route   GET /api/mentorship/mentees
// @access  Private (Alumni only)
const getMyMentees = async (req, res) => {
  try {
    const mentorships = await MentorshipRequest.find({ 
      alumni: req.user._id,
      status: 'accepted'
    }).populate('student', 'name major expectedGraduationYear email');
    res.json(mentorships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { 
  createMentorshipRequest, 
  getReceivedRequests, 
  updateRequestStatus,
  getSentRequests,
  getMyMentors,
  getMyMentees
};