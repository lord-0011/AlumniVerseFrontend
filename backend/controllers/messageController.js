const Message = require('../models/Message');

// @desc    Get all messages for a specific mentorship chat
// @route   GET /api/messages/:mentorshipId
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ mentorshipId: req.params.mentorshipId })
      .populate('sender', 'name') // Get the sender's name
      .sort({ createdAt: 'asc' }); // Sort by oldest first
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getMessages };