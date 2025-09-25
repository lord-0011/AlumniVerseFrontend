const express = require('express');
const router = express.Router();
const { updateUserProfile } = require('../controllers/userControllers.js');
const { protect } = require('../middleware/authMiddleware.js');

// This route is protected. The 'protect' middleware will run first.
router.route('/profile').put(protect, updateUserProfile);

module.exports = router;