import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import ChatTestPage from './pages/chatTestPage';

import YoutubeTestPage from './pages/youtubeTestPage_combined';

const App = (): React.ReactElement<any, any> => {
  return (
    <>
      {YoutubeTestPage}

      <div className="App">
        <ChakraProvider>
          <ChatTestPage />
        </ChakraProvider>
      </div>
    </>
  );
};
export default App;
