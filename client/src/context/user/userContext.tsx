import { createContext } from 'react';
import { UserLoadStatus } from '../../types';

interface UserContextInterface {
  userId: number;
  userName: string;
  status: UserLoadStatus;
}

const UserContext = createContext<UserContextInterface>({
  userId: 0,
  userName: '',
  status: UserLoadStatus.LOADED
});

export default UserContext;
