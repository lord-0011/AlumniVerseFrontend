const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'alumni'], required: true },
  collegeName: { type: String },
  
  // Alumni-specific fields
  graduationYear: { type: Number },
  currentCompany: { type: String },
  jobTitle: { type: String },

  // Student-specific fields
  expectedGraduationYear: { type: Number },
  major: { type: String },
  careerGoals: { type: String },
}, { timestamps: true });

// Hash password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;