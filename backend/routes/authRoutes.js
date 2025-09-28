const express = require('express');
const router = express.Router();

// 🔑 FIX: Ensure the import path is exactly correct. 
// We are explicitly including the '.js' extension to resolve module confusion.
const { registerUser, loginUser } = require('../controllers/authController.js'); 

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;