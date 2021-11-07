import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import LobbyPage from './pages/lobbyPage';

const App = (): React.ReactElement<any, any> => {
  return (
    <div className="App">
      <ChakraProvider>
        <LobbyPage />
      </ChakraProvider>
    </div>
  );
};

export default App;
