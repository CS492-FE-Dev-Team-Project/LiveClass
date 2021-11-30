import { Router } from 'express';
import { authenticateUser } from '../../passport';

export default (app: Router) => {
  const meRouter = Router();
  app.use('/me', meRouter);

  meRouter.get('/', authenticateUser, (req, res) => {
    const userId = req.user?.id;
    const userName = req.user?.userName;
    res.json({ userId, userName, status: 200 });
  });
};
