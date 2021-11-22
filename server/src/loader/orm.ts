import { createConnection } from 'typeorm';
import config from '../config';
import Logger from './logger';

export default async () => {
  const { connectionOptions } = config;

  const connection = await createConnection(connectionOptions);

  Logger.info(`DB connected on ${connectionOptions.port}`);
  return connection;
};
