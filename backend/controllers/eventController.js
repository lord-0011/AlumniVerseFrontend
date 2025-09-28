const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({}).populate('postedBy', 'name').sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new event
// @route   POST /api/events
const createEvent = async (req, res) => {
  if (req.user.role !== 'alumni') {
    return res.status(403).json({ message: 'Only alumni can create events' });
  }
  try {
    const { name, date, location, description, image } = req.body;
    const event = new Event({
      name,
      date,
      location,
      description,
      image,
      postedBy: req.user._id,
    });
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getEvents, createEvent };