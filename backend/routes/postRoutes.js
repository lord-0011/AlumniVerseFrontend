const express = require('express');
const router = express.Router();
const { getPosts, createPost, likePost, commentOnPost } = require('../controllers/postControllers');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getPosts)
  .post(protect, createPost);

router.put('/:id/like', protect, likePost);
router.post('/:id/comment', protect, commentOnPost);

module.exports = router;