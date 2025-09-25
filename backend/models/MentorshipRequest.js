const mongoose = require('mongoose');

const mentorshipRequestSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  alumni: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
    required: true,
  },
  message: { type: String, trim: true },
}, { timestamps: true });

const MentorshipRequest = mongoose.model('MentorshipRequest', mentorshipRequestSchema);
module.exports = MentorshipRequest;