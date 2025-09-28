const express = require('express');
const router = express.Router();
const { getAllAlumni, getDashboardStats, getAlumniDirectory } = require('../controllers/alumniController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAllAlumni);
router.get('/dashboard', protect, getDashboardStats);
router.get('/directory', protect, getAlumniDirectory);

module.exports = router;