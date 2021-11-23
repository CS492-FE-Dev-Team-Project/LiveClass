import { createContext } from 'react';
import { UserLoadStatus } from './userProvider';

interface UserContextInterface {
  userName: string;
  status: UserLoadStatus;
}

const UserContext = createContext<UserContextInterface>({
  userName: '',
  status: UserLoadStatus.LOADING
});

export default UserContext;
