import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import ChatTestPage from './pages/chatTestPage';

// import Instructor from './pages/youtubeTestPage_instructor'
// import Participant from './pages/youtubeTestPage_participant'

const App = (): React.ReactElement<any, any> => {
  return (
    <div className="App">
      <ChakraProvider>
        <ChatTestPage />
      </ChakraProvider>
    </div>
  );

  /* 
  // YouTube component test page
    <>
      <h1>Instructor</h1>
      <div className="App">{Instructor}</div>
      <h1>Participant</h1>
      <div className="App">{Participant}</div>
    </>
  */


};
export default App;
