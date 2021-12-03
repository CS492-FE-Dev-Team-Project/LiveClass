import { createContext } from 'react';
import { UserLoadStatus } from '../../types';

interface UserContextInterface {
  userName: string;
  status: UserLoadStatus;
  id: number;
}

const UserContext = createContext<UserContextInterface>({
  userName: '',
  status: UserLoadStatus.LOADED,
  id: -1
});

export default UserContext;
