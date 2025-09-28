const express = require('express');
const router = express.Router();
const { getAllAlumni, getDashboardStats } = require('../controllers/alumniController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAllAlumni);
router.get('/dashboard', protect, getDashboardStats);

module.exports = router;