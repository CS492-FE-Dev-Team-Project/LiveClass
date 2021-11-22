import { Router } from 'express';
import classRoute from './classRoute';
import auth from './authRoute';

export default () => {
  const route = Router();

  // Add handler made in classRoute Folder
  classRoute(route);
  auth(route);

  return route;
};
