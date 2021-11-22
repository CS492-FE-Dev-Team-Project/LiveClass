import session from 'express-session';
import { getRepository } from 'typeorm';
import { TypeormStore } from 'typeorm-store';
import config from '../config';
import Session from '../entity/session';

const sessionMiddleware = session({
  secret: config.auth.session.secret,
  resave: false,
  saveUninitialized: true,
  store: new TypeormStore({ repository: getRepository(Session) })
});

export default sessionMiddleware;
