const User = require('../models/User');
const Job = require('../models/Job');
const MentorshipRequest = require('../models/MentorshipRequest');
const Post = require('../models/Post');

const getLeaderboard = async (req, res) => {
  try {
    // Query 1: Top Alumni by Points
    const topAlumniByPoints = await User.find({ role: 'alumni' })
      .sort({ points: -1 })
      .limit(10)
      .select('name jobTitle points');

    // Query 2: Top Mentors by Count
    const topMentors = await MentorshipRequest.aggregate([
      { $match: { status: 'accepted' } },
      { $group: { _id: '$alumni', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'alumniDetails' }},
      { $unwind: '$alumniDetails' },
      { $project: { _id: '$alumniDetails._id', name: '$alumniDetails.name', jobTitle: '$alumniDetails.jobTitle', count: '$count' }}
    ]);

    // Query 3: Top Job Posters by Count
    const topJobPosters = await Job.aggregate([
      { $group: { _id: '$postedBy', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'alumniDetails' }},
      { $unwind: '$alumniDetails' },
      { $project: { _id: '$alumniDetails._id', name: '$alumniDetails.name', jobTitle: '$alumniDetails.jobTitle', count: '$count' }}
    ]);
    
    // Query 4: Top Posters by Count
    const topPosters = await Post.aggregate([
      { $group: { _id: '$user', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'users',
          // CORRECTED: Removed the space before '_id'
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' },
      {
        $project: {
          _id: '$userDetails._id',
          name: '$userDetails.name',
          jobTitle: '$userDetails.jobTitle',
          count: '$count'
        }
      }
    ]);

    res.json({ topAlumniByPoints, topMentors, topJobPosters, topPosters });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getLeaderboard };