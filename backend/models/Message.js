const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  mentorshipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MentorshipRequest', // Links the message to a specific mentorship
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // The user who sent the message
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true }); // `timestamps` adds createdAt and updatedAt fields

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;