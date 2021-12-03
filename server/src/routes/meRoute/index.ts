import { Router } from 'express';
import { authenticateUser } from '../../passport';

export default (app: Router) => {
  const meRouter = Router();
  app.use('/me', meRouter);

  meRouter.get('/', authenticateUser, (req, res) => {
    const userName = req.user?.userName;
    const id = req.user?.id;
    res.json({ userName, id, status: 200 });
  });
};
