import { Router } from 'express';
import classRoute from './classRoute';
import auth from './authRoute';
import meRoute from './meRoute';

export default () => {
  const route = Router();

  // Add handler made in classRoute Folder
  classRoute(route);
  auth(route);
  meRoute(route);

  return route;
};
