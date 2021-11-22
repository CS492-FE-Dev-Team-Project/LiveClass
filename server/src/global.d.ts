/* eslint-disable no-unused-vars */
import UserEntity from './entity/user';

declare global {
  namespace Express {
    interface User extends UserEntity {}
  }
}
