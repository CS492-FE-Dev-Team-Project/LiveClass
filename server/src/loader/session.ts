import session from 'express-session';
import { Connection } from 'typeorm';
import { TypeormStore } from 'typeorm-store';
import config from '../config';
import Session from '../entity/sessionEntity';

export default (connection: Connection) => {
  return session({
    secret: config.auth.session.secret,
    resave: false,
    saveUninitialized: true,
    store: new TypeormStore({ repository: connection.getRepository(Session) })
  });
};
