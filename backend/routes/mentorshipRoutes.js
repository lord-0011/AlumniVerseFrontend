const express = require('express');
const router = express.Router();
const { 
  createMentorshipRequest,
  getReceivedRequests,
  updateRequestStatus
} = require('../controllers/mentorshipController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/request/:alumniId').post(protect, createMentorshipRequest);
router.route('/requests/received').get(protect, getReceivedRequests);
router.route('/requests/:requestId').put(protect, updateRequestStatus);

module.exports = router;