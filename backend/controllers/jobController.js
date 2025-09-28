const Job = require('../models/Job');
const User = require('../models/User');

/**
 * @desc    Fetch all jobs
 * @route   GET /api/jobs
 * @access  Private
 */
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({})
      .populate('postedBy', 'name') // Get the poster's name from the User model
      .sort({ createdAt: -1 }); // Show the newest jobs first
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Create a new job posting
 * @route   POST /api/jobs
 * @access  Private (Alumni only)
 */
const createJob = async (req, res) => {
  // Only allow users with the 'alumni' role to post jobs
  if (req.user.role !== 'alumni') {
    return res.status(403).json({ message: 'Not authorized to post jobs' });
  }

  try {
    const { title, company, location, description, type, applicationLink } = req.body;

    // Create a new job instance with all details
    const job = new Job({
      title,
      company,
      location,
      description,
      type,
      applicationLink,
      postedBy: req.user._id, // Link the job to the logged-in alumni
    });

    const createdJob = await job.save();

    // Award 15 points to the alumni for posting a job
    await User.findByIdAndUpdate(req.user._id, { $inc: { points: 15 } });

    res.status(201).json(createdJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name');
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getJobs, createJob,getJobById };