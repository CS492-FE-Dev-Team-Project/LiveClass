import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginModal from './components/loginModal';
import { SocketProvider } from './context/socket';
import ClassPage from './pages/classPage';
import LobbyPage from './pages/lobbyPage';

const App = (): React.ReactElement<any, any> => {
  return (
    <div className="App">
      <LoginModal />
      <Router>
        <Routes>
          <Route path="/" element={<LobbyPage />} />
          <Route
            path="class"
            element={
              <SocketProvider url="http://localhost:5000/">
                <ClassPage />
              </SocketProvider>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
