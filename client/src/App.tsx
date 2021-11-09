<<<<<<< HEAD
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
=======
import React from 'react';
import './App.css';
import Instructor from './pages/youtubeTestPage_instructor';
import Participant from './pages/youtubeTestPage_participant';

const App = (): React.ReactElement<any, any> => {
  return (
    <div className="App">
      <Instructor />
    </div>
  );
};

export default App;
>>>>>>> Normalize all the line endings
