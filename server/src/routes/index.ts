import { Router } from 'express';
import auth from './authRoute';
import meRoute from './meRoute';
import lobbyRoute from './lobbyRoute';
import translateRoute from './translateRoute';

export default () => {
  const route = Router();

  // Add handler made in classRoute Folder
  auth(route);
  meRoute(route);
  lobbyRoute(route);
  translateRoute(route);

  return route;
};
