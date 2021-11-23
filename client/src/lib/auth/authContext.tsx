import { createContext } from 'hoist-non-react-statics/node_modules/@types/react';
import { useContext } from 'react';

interface UserContextInterface {
  key: string;
}

const AuthContext = createContext<UserContextInterface>({
  key: 'auth'
});

export default AuthContext;
