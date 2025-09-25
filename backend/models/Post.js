const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This creates a relationship to the User model
    },
    content: {
      type: String,
      required: true,
    },
    // Optional fields for future features
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
    comments: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;