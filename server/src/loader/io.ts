import passport from 'passport';
import { Socket } from 'socket.io';
import ioHandler from '../ioHandler';
import Server from '../server';

export default (server: Server, sessionMiddleware: any) => {
  const { io, classManager } = server;
  const wrap = (middleware: any) => (socket: Socket, next: any) =>
    middleware(socket.request, {}, next);

  io.use(wrap(sessionMiddleware));
  io.use(wrap(passport.initialize()));
  io.use(wrap(passport.session()));

  ioHandler(io, classManager);
};
