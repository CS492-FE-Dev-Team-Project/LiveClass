import { Router } from 'express';
import passport from 'passport';

const naverRouter = Router();

naverRouter.get('/', passport.authenticate('naver'), (req, res) => {
  res.redirect('/');
});

naverRouter.get(
  '/callback',
  passport.authenticate('naver', {
    successRedirect: '/',
    failureRedirect: '/api/auth/naver'
  })
);

export default naverRouter;
