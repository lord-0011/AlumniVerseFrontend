const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // URL for an event banner image
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // The alumnus who created the event
    required: true,
  },
}, { timestamps: true });

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;