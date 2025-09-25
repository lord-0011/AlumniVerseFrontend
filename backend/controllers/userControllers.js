const User = require('../models/User.js');

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = async (req, res) => {
  // The user to update is found by the 'protect' middleware and attached to req.user
  const user = await User.findById(req.user._id);

  if (user) {
    // Update fields from the request body
    user.name = req.body.name || user.name;
    user.collegeName = req.body.collegeName || user.collegeName;

    // Update role-specific fields
    if (user.role === 'alumni') {
      user.graduationYear = req.body.graduationYear || user.graduationYear;
      user.currentCompany = req.body.currentCompany || user.currentCompany;
      user.jobTitle = req.body.jobTitle || user.jobTitle;
    } else {
      user.expectedGraduationYear = req.body.expectedGraduationYear || user.expectedGraduationYear;
      user.major = req.body.major || user.major;
      user.careerGoals = req.body.careerGoals || user.careerGoals;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      // ...return other updated fields if needed
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { updateUserProfile };