const Message = require('./models/Message');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

module.exports = (io) => {
  // NEW: Socket.IO middleware for authentication
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the user to the socket object
        socket.user = await User.findById(decoded.id).select('-password');
        next();
      } catch (error) {
        return next(new Error('Authentication error'));
      }
    } else {
      return next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    // Now, socket.user is available here
    console.log(`User connected: ${socket.user.name} (${socket.id})`);

    socket.on('joinRoom', (mentorshipId) => {
      socket.join(mentorshipId);
      console.log(`${socket.user.name} joined room: ${mentorshipId}`);
    });

    socket.on('sendMessage', async (data) => {
      const { room: mentorshipId, message: content } = data;
      
      try {
        // Now socket.user._id is available to save the message
        const message = await Message.create({
          mentorshipId,
          sender: socket.user._id, // This will now work
          content,
        });

        const populatedMessage = await Message.findById(message._id).populate('sender', 'name');
        
        // Broadcast to the room
        io.to(mentorshipId).emit('receiveMessage', populatedMessage);
        
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.name}`);
    });
  });
};