const express = require('express');
const router = express.Router();
const { getStartups, createStartup } = require('../controllers/startupController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getStartups)
  .post(protect, createStartup);

module.exports = router;