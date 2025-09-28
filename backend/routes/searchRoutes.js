const express = require('express');
const router = express.Router();
const { performSearch } = require('../controllers/searchController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, performSearch);

module.exports = router;