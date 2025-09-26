const Startup = require('../models/Startup'); // 👈 FIX: Ensure correct import for default export

const getStartups = async (req, res) => {
  try {
    const startups = await Startup.find({}).populate('founder', 'name role');
    res.json(startups);
  } catch (error) {
    // 💡 Add server-side logging for debugging
    console.error('Startup Fetch Error:', error); 
    res.status(500).json({ message: 'Server Error fetching startups' });
  }
};

const createStartup = async (req, res) => {
  // Assuming you have authorization (alumni/founder) logic here if needed
  // if (req.user.role !== 'alumni') { ... } 
  
  try {
    const { name, domain, stage, pitch, website, fundingNeeds } = req.body;
    
    // Add basic validation check
    if (!name || !domain || !pitch) {
        return res.status(400).json({ message: 'Startup name, domain, and pitch are required.' });
    }
    
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
    console.error('Startup Creation Error:', error);
    res.status(500).json({ message: 'Server Error creating startup' });
  }
};

module.exports = { getStartups, createStartup };