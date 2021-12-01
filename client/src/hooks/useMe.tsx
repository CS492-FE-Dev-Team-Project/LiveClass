import { useContext } from 'react';
import UserContext from '../context/user/userContext';

const useMe = () => {
  const { status, userName } = useContext(UserContext);

  return { status, userName };
};

export default useMe;
