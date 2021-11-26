import { createServer, Server as httpServer } from 'http';
import express from 'express';
import { Server as SocketIOServer } from 'socket.io';

import config from './config';
import ClassManager from './data/classManager';

class Server {
  public httpServer: httpServer;

  public io: SocketIOServer;

  public expressApp: express.Application;

  public classManager: ClassManager;

  constructor() {
    this.expressApp = express();
    this.httpServer = createServer(this.expressApp);
    this.io = new SocketIOServer(this.httpServer, { cors: { origin: '*' } });
    this.classManager = new ClassManager();
  }

  public listen(callback?: () => void) {
    this.httpServer.listen(config.HTTP_PORT, callback);
  }
}

export default Server;
