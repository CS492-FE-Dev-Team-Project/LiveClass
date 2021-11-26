import 'reflect-metadata';
import config from './config';
import { expressLoader, ioLoader, Logger, ormLoader, session } from './loader';
import Server from './server';

const start = async () => {
  const server = new Server();

  const connection = await ormLoader();
  const sessionMiddleware = session(connection);
  expressLoader(server, sessionMiddleware);
  ioLoader(server, sessionMiddleware);

  server.listen(() => {
    Logger.info(`Server Running on ${config.HTTP_PORT}`);
  });
};

start();
