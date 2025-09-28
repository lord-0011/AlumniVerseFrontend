const express = require('express');
const router = express.Router();
const { getJobs, createJob,getJobById } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getJobs)
  .post(protect, createJob);

router.get('/:id', protect, getJobById);

module.exports = router;