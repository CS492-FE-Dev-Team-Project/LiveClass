import { Server as SocketIOServer } from 'socket.io';

export default (io: SocketIOServer) => {
  io.on('connection', socket => {
    io.emit('user', 'connected');
    socket.on('disconnect', () => {
      io.emit('user', 'disconnected');
    });
  });
};
