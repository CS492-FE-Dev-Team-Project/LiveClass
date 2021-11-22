import express from 'express';
import cors from 'cors';
import morgan, { StreamOptions } from 'morgan';
import session from 'express-session';
import { Connection } from 'typeorm';
import { TypeormStore } from 'typeorm-store';
import passport from 'passport';
import myPassport from '../passport';

import serverRoute from '../routes';
import Logger from './logger';
import config from '../config';
import Session from '../entity/session';

export default (app: express.Application, connection: Connection) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.urlencoded({ extended: true }));
  const stream: StreamOptions = {
    write: msg => Logger.http(msg.substring(0, msg.lastIndexOf('\n')))
  };
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms', {
      stream
    })
  );

  const sessionRepository = connection.getRepository(Session);
  app.use(
    session({
      secret: config.auth.session.secret,
      resave: false,
      saveUninitialized: true,
      store: new TypeormStore({ repository: sessionRepository })
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  myPassport();

  app.get('/', (req, res) => {
    res.send('LiveClass Main Server!!').status(200);
  });

  // TODO: Add Authentication Middlewares

  app.use('/api', serverRoute());

  app.use('/*', (req, res) => {
    res.send('404 Bad Request: Invalid Url').status(404);
  });

  // TODO: Add Error Handling middlewares
};
