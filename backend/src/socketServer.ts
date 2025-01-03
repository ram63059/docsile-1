import { Server } from 'socket.io';
import { createServer } from 'http';

// Create HTTP server
const httpServer = createServer();

// Initialize Socket.IO with the HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",  // Your frontend URL
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  pingTimeout: 60000,
  pingInterval: 25000
});

// Keep track of connected users and their rooms
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);

  // Handle joining conversations/groups
  socket.on('join_conversation', (data: { conversationId?: number | string, isGroup?: boolean, userId?: number }) => {
    if (!data || !data.conversationId) {
      console.error('Invalid join_conversation data:', data);
      return;
    }

    const roomId = data.conversationId.toString();
    console.log(`👥 User ${data.userId || socket.id} joining ${data.isGroup ? 'group' : 'conversation'} ${roomId}`);
    
    // Store user's room information
    if (data.userId) {
      connectedUsers.set(socket.id, {
        userId: data.userId,
        currentRoom: roomId
      });
    }
    
    socket.join(roomId);
    
    // Notify room that user has joined
    socket.to(roomId).emit('user_joined', {
      userId: data.userId,
      socketId: socket.id,
      roomId: roomId
    });
  });

  // Handle direct messages
  socket.on('send_message', (data) => {
    if (!data || !data.conversationId) {
      console.error('Invalid message data:', data);
      return;
    }

    console.log('📨 Received direct message:', data);
    const roomId = data.conversationId.toString();
    
    // Broadcast the message to all users in the room
    io.to(roomId).emit('new_message', {
      id: data.id,
      conversationId: data.conversationId,
      content: data.content,
      senderId: data.senderId,
      sender: data.sender,
      createdAt: new Date().toISOString()
    });
  });

  // Handle group messages
  socket.on('send_group_message', (data) => {
    if (!data || !data.groupId) {
      console.error('Invalid group message data:', data);
      return;
    }

    console.log('👥 Received group message:', data);
    const roomId = data.groupId.toString();
    
    // Broadcast the group message to all users in the room
    io.to(roomId).emit('new_group_message', {
      id: data.id,
      groupId: data.groupId,
      conversationId: data.conversationId,
      content: data.content,
      senderId: data.senderId,
      sender: data.sender,
      createdAt: new Date().toISOString()
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('🔌 User disconnected:', socket.id);
    
    // Get user's room information
    const userInfo = connectedUsers.get(socket.id);
    if (userInfo) {
      // Notify room that user has left
      socket.to(userInfo.currentRoom).emit('user_left', {
        userId: userInfo.userId,
        socketId: socket.id,
        roomId: userInfo.currentRoom
      });
      
      // Remove user from tracking
      connectedUsers.delete(socket.id);
    }
  });

  // Handle errors
  socket.on('error', (error) => {
    console.error('❌ Socket error:', error);
  });
});

const port = 3000;
httpServer.listen(port, () => {
  console.log(`🚀 Socket.IO server running on http://localhost:${port}`);
});

export { io }; 