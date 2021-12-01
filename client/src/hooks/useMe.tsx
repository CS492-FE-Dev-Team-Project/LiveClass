import { useContext } from 'react';
import UserContext from '../context/user/userContext';

const useMe = () => {
  const { status, userId, userName } = useContext(UserContext);

  return { status, userId, userName };
};

export default useMe;
