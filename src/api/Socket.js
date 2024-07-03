import io from 'socket.io-client';

let socket;

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3010';

export const connectSocket = (token) => {
  socket = io(SOCKET_URL, {
    path: '/socket.io',
    query: { token },
    secure: true,
    rejectUnauthorized: true, // Only set to false in development if using self-signed certificates
    transports: ['websocket', 'polling'], // Ensure fallback to long polling if needed
  });

  socket.on('connect', () => {
    console.log('Connected to server successfully');
  });

  socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  return socket;
};

export const sendMessage = (message) => {
  if (socket && socket.connected) {
    socket.emit('chat message', message);
  } else {
    console.error('Socket not connected');
  }
};

export const subscribeToChat = (cb) => {
  if (socket) {
    socket.on('chat message', (message) => {
      cb(message);
    });
  } else {
    console.error('Socket not connected');
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  } else {
    console.error('Socket not connected');
  }
};
