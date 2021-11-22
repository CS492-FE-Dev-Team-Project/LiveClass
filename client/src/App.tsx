import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import QuizTestPage from './pages/quizTestPage';
import LeftMenuPage from './pages/leftmenuTestPage';
import ChatTestPage from './pages/chatTestPage';
import YoutubeTestPage from './pages/youtubeTestPage_combined';

const App = (): React.ReactElement<any, any> => {
  return (
    <>
      <div className="App">
        <ChakraProvider>
          {YoutubeTestPage}
          <ChatTestPage />
          <LeftMenuPage />
        </ChakraProvider>
      </div>
    </>
  );
};
export default App;
