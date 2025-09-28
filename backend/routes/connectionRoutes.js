const express = require('express');
const router = express.Router();
const { sendConnectionRequest,getConnections,acceptConnectionRequest,checkConnectionStatus } = require('../controllers/connectionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/send/:recipientId', protect, sendConnectionRequest);
router.get('/', protect, getConnections);
router.put('/accept/:requestId', protect, acceptConnectionRequest);
router.get('/status/:profileUserId', protect, checkConnectionStatus);

module.exports = router;