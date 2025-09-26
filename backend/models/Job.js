const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['Full-time', 'Part-time', 'Internship', 'Contract'], required: true },
  
  // NEW: Add a field for the application link
  applicationLink: { type: String, required: true },

  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;