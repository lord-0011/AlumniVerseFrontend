const express = require('express');
const router = express.Router();
const { 
  createMentorshipRequest,
  getReceivedRequests,
  updateRequestStatus,
  getSentRequests // Import the new function
} = require('../controllers/mentorshipController');
const { protect } = require('../middleware/authMiddleware');

router.post('/request/:alumniId', protect, createMentorshipRequest);
router.get('/requests/received', protect, getReceivedRequests);
router.put('/requests/:requestId', protect, updateRequestStatus);

// NEW: Route for a student to get their sent requests
router.get('/requests/sent', protect, getSentRequests);

module.exports = router;