import { ChakraProvider } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizTestPage from './pages/quizTestPage';
import LeftMenuPage from './pages/leftmenuTestPage';
import ChatTestPage from './pages/chatTestPage';
import YoutubeTestPage from './pages/youtubeTestPage_combined';
import LobbyPage from './pages/lobbyPage';
import LoginModal from './components/loginModal';
import UserContext from './context/user/userContext';

const App = (): React.ReactElement<any, any> => {
  return (
    <>
      <div className="App">
        <LoginModal />
        <Router>
          <Routes>
            <Route path="/" element={<LobbyPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};
export default App;
