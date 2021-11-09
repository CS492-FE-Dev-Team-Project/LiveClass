import { Router } from 'express';
import classRoute from './classRoute';

export default () => {
  const route = Router();

  // Add handler made in classRoute Folder
  classRoute(route);

  return route;
};
