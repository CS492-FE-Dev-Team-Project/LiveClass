import 'reflect-metadata';
import config from './config';
import Server from './server';
import ormLoader from './loader/orm';
import expressLoader from './loader/express';
import ioLoader from './loader/io';
import sessionLoader from './loader/session';
import Logger from './loader/logger';

const start = async () => {
  const server = new Server();

  const connection = await ormLoader();
  const sessionMiddleware = sessionLoader(connection);
  expressLoader(server, sessionMiddleware);
  ioLoader(server, sessionMiddleware);

  server.classManager.initClasses();

  server.listen(() => {
    Logger.info(`Server Running on ${config.HTTP_PORT}`);
  });
};

start();
