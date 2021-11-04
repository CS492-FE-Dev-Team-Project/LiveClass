import { Server as SocketIOServer, Socket } from 'socket.io';

export default (io: SocketIOServer) => {
  io.on('connection', (socket: Socket) => {
    socket.on('disconnect', () => {
      socket.disconnect();
    });
  });
};
