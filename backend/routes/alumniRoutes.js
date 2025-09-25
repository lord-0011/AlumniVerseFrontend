const express = require('express');
const router = express.Router();
const { getAllAlumni } = require('../controllers/alumniController.js');
const { protect } = require('../middleware/authMiddleware.js');

// This route is protected, so only logged-in users can see the alumni list
router.route('/').get(protect, getAllAlumni);

module.exports = router;