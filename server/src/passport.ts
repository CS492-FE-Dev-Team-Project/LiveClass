import passport from 'passport';
import { Strategy as NaverStrategy, Profile } from 'passport-naver-v2';
import { Express, NextFunction, Request, Response } from 'express';

import User from './entity/user';
import config from './config';
import Logger from './loader/logger';

export default () => {
  passport.serializeUser((user: Express.User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: number, done) => {
    User.findOne(id)
      .then(user => {
        if (user === undefined) {
          done(Error(`No User with id: ${id} found`), null);
        }
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  });

  passport.use(
    new NaverStrategy(
      {
        clientID: config.auth.naver.clientId,
        clientSecret: config.auth.naver.clientSecret,
        callbackURL: config.auth.naver.callbackURL
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: any
      ) => {
        Logger.info(JSON.stringify(profile));
        User.findOne({ where: { naverId: profile.id } })
          .then(async user => {
            if (user === undefined) {
              const newUser = new User();
              newUser.naverId = profile.id;
              newUser.userName = profile.nickname!;
              done(null, await newUser.save());
            }
            done(null, user);
          })
          .catch(err => {
            done(err, null);
          });
      }
    )
  );
};

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  Logger.info('Authentication Failed');
  return res.json({ status: 401 }).status(401);
};
