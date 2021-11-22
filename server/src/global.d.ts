/* eslint-disable */
import UserEntity from './entity/user';

declare global {
  namespace Express {
    interface User extends UserEntity {}
  }
}
