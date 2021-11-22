import { Router } from 'express';
import naverRouter from './naverLogin';

export default (app: Router) => {
  const appRouter = Router();
  app.use('/auth', appRouter);

  appRouter.use('/naver', naverRouter);
};
