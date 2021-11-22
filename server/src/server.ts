import { createServer, Server as httpServer } from 'http';
import express from 'express';
import { Server as SocketIOServer } from 'socket.io';

import config from './config';
import { expressLoader, ioLoader, ormLoader } from './loader';
import Logger from './loader/logger';

class Server {
  private httpServer: httpServer;

  private io: SocketIOServer;

  private expressApp: express.Application;

  constructor() {
    this.expressApp = express();
    this.httpServer = createServer(this.expressApp);
    this.io = new SocketIOServer(this.httpServer, { cors: { origin: '*' } });
  }

  public static async start(): Promise<void> {
    const server = new Server();

    const { expressApp, io } = server;

    /** Loaders */
    const connection = await ormLoader();
    expressLoader(expressApp, connection);
    ioLoader(io);

    server.httpServer.listen(config.HTTP_PORT, () => {
      Logger.info(`Server running on port ${config.HTTP_PORT}`);
    });
  }
}

export default Server;
