import { createContext } from 'react';
import { UserLoadStatus } from '../../types';

interface UserContextInterface {
  userName: string;
  status: UserLoadStatus;
}

const UserContext = createContext<UserContextInterface>({
  userName: '',
  status: UserLoadStatus.LOADED
});

export default UserContext;
