import express from 'express';
import cors from 'cors';
import morgan, { StreamOptions } from 'morgan';
import passport from 'passport';
import myPassport from '../passport';

import serverRoute from '../routes';
import Logger from './logger';
import sessionMiddleware from './session';

export default (app: express.Application) => {
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

  app.use(sessionMiddleware);

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
