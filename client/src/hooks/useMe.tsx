import { useContext } from 'react';
import UserContext from '../context/user/userContext';

const useMe = () => {
  const { status, userName, id } = useContext(UserContext);

  return { status, userName, id };
};

export default useMe;
