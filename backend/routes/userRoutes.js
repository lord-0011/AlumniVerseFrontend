const express = require('express');
const router = express.Router();
// Add getAlumni to the import
const { updateUserProfile, getUserProfile, getAlumni,getUserById,checkUserStatus } = require('../controllers/userControllers.js'); 
const { protect } = require('../middleware/authMiddleware.js');

// This route handles getting and updating a single user's profile
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// THIS ROUTE WAS MISSING
router.route('/alumni').get(protect, getAlumni);
router.get('/:id', protect, getUserById);
router.get('/status/:profileUserId', protect, checkUserStatus);

module.exports = router;