/* eslint-disable no-unused-vars */
import UserEntity from './entity/userEntity';

declare global {
  namespace Express {
    interface User extends UserEntity {}
  }
}
