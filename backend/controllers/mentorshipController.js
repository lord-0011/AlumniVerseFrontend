const MentorshipRequest = require('../models/MentorshipRequest');

// @desc    Create a mentorship request
// @route   POST /api/mentorship/request/:alumniId
// @access  Private (Students only)

const getSentRequests = async (req, res) => {
  try {
    const requests = await MentorshipRequest.find({ 
      student: req.user._id,
      status: { $ne: 'rejected' } // Find all requests where status is NOT EQUAL to 'rejected'
    }).populate('alumni', 'name');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createMentorshipRequest = async (req, res) => {
  const alumniId = req.params.alumniId;
  const studentId = req.user._id;

  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Only students can send requests.' });
  }

  // UPDATED: Check for existing requests that are either 'pending' OR 'accepted'
  const existingRequest = await MentorshipRequest.findOne({
    student: studentId,
    alumni: alumniId,
    status: { $in: ['pending', 'accepted'] } // Use $in to check for multiple statuses
  });

  if (existingRequest) {
    const message = existingRequest.status === 'pending'
      ? 'You already have a pending request with this alumnus.'
      : 'You already have an active mentorship with this alumnus.';
    return res.status(400).json({ message });
  }

  const request = await MentorshipRequest.create({
    student: studentId,
    alumni: alumniId,
    message: req.body.message || '',
  });

  res.status(201).json(request);
};


// @desc    Get mentorship requests received by alumni
// @route   GET /api/mentorship/requests
// @access  Private (Alumni only)
const getReceivedRequests = async (req, res) => {
  if (req.user.role !== 'alumni') {
    return res.status(403).json({ message: 'Only alumni can view requests.' });
  }

  const requests = await MentorshipRequest.find({
    alumni: req.user._id,
    status: 'pending'
  }).populate('student', 'name collegeName major');

  res.json(requests);
};

// @desc    Update a mentorship request status (accept/reject)
// @route   PUT /api/mentorship/requests/:requestId
// @access  Private (Alumni only)
const updateRequestStatus = async (req, res) => {
  const { status } = req.body; // 'accepted' or 'rejected'
  const request = await MentorshipRequest.findById(req.params.requestId);

  if (!request) {
    return res.status(404).json({ message: 'Request not found.' });
  }

  // Ensure the logged-in user is the alumnus who received the request
  if (request.alumni.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'User not authorized.' });
  }

  request.status = status;
  await request.save();

  // TODO: Send notification to student (if implemented)
  res.json({ message: `Request ${status}.` });
};

// ... (other functions: createMentorshipRequest, getSentRequests, etc.)

// NEW: Get active mentorships for a STUDENT
const getMyMentors = async (req, res) => {
  try {
    const mentorships = await MentorshipRequest.find({ 
      student: req.user._id,
      status: 'accepted' // Only show accepted connections
    }).populate('alumni', 'name jobTitle currentCompany email'); // Get mentor's details
    res.json(mentorships);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// NEW: Get active mentorships for an ALUMNI
const getMyMentees = async (req, res) => {
  try {
    const mentorships = await MentorshipRequest.find({ 
      alumni: req.user._id,
      status: 'accepted'
    }).populate('student', 'name major expectedGraduationYear email'); // Get mentee's details
    res.json(mentorships);
  } catch (error) {
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
