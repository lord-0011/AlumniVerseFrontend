const Startup = require('../models/Startup');

const getStartups = async (req, res) => {
  try {
    const startups = await Startup.find({}).populate('founder', 'name role');
    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createStartup = async (req, res) => {
  try {
    const { name, domain, stage, pitch, website, fundingNeeds } = req.body;
    const startup = new Startup({
      name,
      domain,
      stage,
      pitch,
      website,
      fundingNeeds,
      founder: req.user._id,
    });
    const createdStartup = await startup.save();
    res.status(201).json(createdStartup);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getStartups, createStartup };