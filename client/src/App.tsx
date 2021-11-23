import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizTestPage from './pages/quizTestPage';
import LeftMenuPage from './pages/leftmenuTestPage';
import ChatTestPage from './pages/chatTestPage';
import YoutubeTestPage from './pages/youtubeTestPage_combined';
import LobbyPage from './pages/lobbyPage';

const App = (): React.ReactElement<any, any> => {
  return (
    <>
      <div className="App">
        <ChakraProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LobbyPage />} />
              <Route path="/youtubetest" element={YoutubeTestPage} />
            </Routes>
          </Router>
        </ChakraProvider>
      </div>
    </>
  );
};
export default App;
