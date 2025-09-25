const express = require('express');
const router = express.Router();
const { createPost, getPosts } = require('../controllers/postControllers.js');
const { protect } = require('../middleware/authMiddleware.js');

// Apply the 'protect' middleware to both routes
router.route('/').post(protect, createPost).get(protect, getPosts);

module.exports = router;