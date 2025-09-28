const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted'],
    default: 'pending',
  },
}, { timestamps: true });

const Connection = mongoose.model('Connection', ConnectionSchema);
module.exports = Connection;