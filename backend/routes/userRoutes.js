const express = require('express');
const router = express.Router();
const { updateUserProfile, getUserProfile } = require('../controllers/userControllers.js');
const { protect } = require('../middleware/authMiddleware.js');

// This route now handles both getting and updating the profile
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;