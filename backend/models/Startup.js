const mongoose = require('mongoose');

const StartupSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  domain: { type: String, required: true },
  founder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stage: {
    type: String,
    enum: ['Idea', 'Prototype', 'Early Growth', 'Scaling'],
    required: true,
  },
  pitch: { type: String }, // Link to pitch deck
  website: { type: String },
  fundingNeeds: { type: String },
}, { timestamps: true });

const Startup = mongoose.model('Startup', StartupSchema);
module.exports = Startup;