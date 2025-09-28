const Connection = require('../models/Connection');

const sendConnectionRequest = async (req, res) => {
  const requesterId = req.user._id;
  const recipientId = req.params.recipientId;

  // Prevent sending a request to oneself
  if (requesterId.toString() === recipientId) {
    return res.status(400).json({ message: "You cannot connect with yourself." });
  }

  // Check if a connection already exists
  const existingConnection = await Connection.findOne({
    $or: [
      { requester: requesterId, recipient: recipientId },
      { requester: recipientId, recipient: requesterId },
    ],
  });

  if (existingConnection) {
    return res.status(400).json({ message: "A connection or request already exists." });
  }

  const connection = await Connection.create({ requester: requesterId, recipient: recipientId });
  res.status(201).json(connection);
};

const getConnections = async (req, res) => {
  try {
    const userId = req.user._id;
    // UPDATED: Populate both requester and recipient fields
    const connections = await Connection.find({
      $or: [{ requester: userId }, { recipient: userId }],
    })
    .populate('requester', 'name jobTitle currentCompany') // Add fields you need
    .populate('recipient', 'name jobTitle currentCompany'); // Add fields you need
    
    res.json(connections);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Accept a connection request
// @route   PUT /api/connections/accept/:requestId
const acceptConnectionRequest = async (req, res) => {
  try {
    const request = await Connection.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    // Ensure the logged-in user is the recipient of the request
    if (request.recipient.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    request.status = 'accepted';
    await request.save();
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const checkConnectionStatus = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const profileUserId = req.params.profileUserId;

    const connection = await Connection.findOne({
      $or: [
        { requester: loggedInUserId, recipient: profileUserId },
        { requester: profileUserId, recipient: loggedInUserId },
      ],
    });

    if (connection) {
      res.json({ status: connection.status, connectionId: connection._id });
    } else {
      res.json({ status: 'not_connected' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = { sendConnectionRequest,acceptConnectionRequest, getConnections, checkConnectionStatus };