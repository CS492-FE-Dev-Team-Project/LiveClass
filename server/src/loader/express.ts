import express from 'express';
import cors from 'cors';
import morgan, { StreamOptions } from 'morgan';
import passport from 'passport';
import path from 'path';

import myPassport from '../passport';
import serverRoute from '../routes';
import Logger from './logger';
import Server from '../server';

export default (server: Server, sessionMiddleware: any) => {
  const { expressApp: app } = server;
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

  app.use(express.static(path.join(__dirname, '../../client')));

  // TODO: Add Authentication Middlewares

  app.use('/api', serverRoute());
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });

  app.get('*', (req, res) => {
    res.redirect('/');
  });

  // TODO: Add Error Handling middlewares
};
