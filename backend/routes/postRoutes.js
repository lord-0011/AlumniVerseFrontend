const express = require('express');
const router = express.Router();
const { getPosts, createPost, likePost, commentOnPost,getPostById } = require('../controllers/postControllers');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

router.route('/')
  .get(protect, getPosts)
  .post(protect, upload.single('image'), createPost);

router.put('/:id/like', protect, likePost);
router.post('/:id/comment', protect, commentOnPost);
router.get('/:id', protect, getPostById);

module.exports = router;