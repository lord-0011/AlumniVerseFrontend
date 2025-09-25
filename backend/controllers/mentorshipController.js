const MentorshipRequest = require('../models/MentorshipRequest');

// @desc    Create a mentorship request
// @route   POST /api/mentorship/request/:alumniId
// @access  Private (Students only)
const createMentorshipRequest = async (req, res) => {
  const alumniId = req.params.alumniId;
  const studentId = req.user._id;

  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Only students can send requests.' });
  }

  // Check if a pending request already exists
  const existingRequest = await MentorshipRequest.findOne({
    student: studentId,
    alumni: alumniId,
    status: 'pending'
  });

  if (existingRequest) {
    return res.status(400).json({ message: 'You already have a pending request with this alumnus.' });
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

module.exports = { 
  createMentorshipRequest, 
  getReceivedRequests, 
  updateRequestStatus 
};
