import passport from 'passport';
import { Server as SocketIOServer, Socket } from 'socket.io';
import ioHandler from '../ioHandler';

export default (io: SocketIOServer, sessionMiddleware: any) => {
  const wrap = (middleware: any) => (socket: Socket, next: any) =>
    middleware(socket.request, {}, next);

  io.use(wrap(sessionMiddleware));
  io.use(wrap(passport.initialize()));
  io.use(wrap(passport.session()));

  // TODO: Fix type error and add auth part
  // io.use((socket, next) => {
  //   if (socket.request.user) {
  //     next();
  //   } else {
  //     next(new Error('unauthorized'));
  //   }
  // });

  ioHandler(io);
};
