import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import ChatTestPage from './pages/chatTestPage';

const App = (): React.ReactElement<any, any> => {
  return (
    <div className="App">
      <ChakraProvider>
        <ChatTestPage />
      </ChakraProvider>
    </div>
  );
};

export default App;
