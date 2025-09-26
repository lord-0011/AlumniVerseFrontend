const Job = require('../models/Job');
// ... (getJobs function remains the same)

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({})
      .populate('postedBy', 'name') // Get the poster's name
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createJob = async (req, res) => {
  if (req.user.role !== 'alumni') {
    return res.status(403).json({ message: 'Not authorized to post jobs' });
  }
  try {
    // Add applicationLink to the destructured body
    const { title, company, location, description, type, applicationLink } = req.body;
    const job = new Job({
      title,
      company,
      location,
      description,
      type,
      applicationLink, // Save the new field
      postedBy: req.user._id,
    });
    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getJobs, createJob };