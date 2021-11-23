import { Router } from 'express';
import classRoute from './classRoute';
import auth from './authRoute';
import meRoute from './meRoute';
import lobbyRoute from './lobbyRoute';

export default () => {
  const route = Router();

  // Add handler made in classRoute Folder
  classRoute(route);
  auth(route);
  meRoute(route);
  lobbyRoute(route);

  return route;
};
