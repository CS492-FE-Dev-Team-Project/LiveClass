import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginModal from './components/loginModal';
import { SocketProvider } from './context/socket';
import ClassPage from './pages/classPage';
import LecturePage from './pages/lecturePage';
import LobbyPage from './pages/lobbyPage';

const App = (): React.ReactElement<any, any> => {
  return (
    <div className="App">
      <SocketProvider url="http://localhost:5000/">
        <LoginModal />
        <Router>
          <Routes>
            <Route path="/" element={<LobbyPage />} />
            <Route
              path="class/:classUuid/:memberType"
              element={<ClassPage />}
            />
            <Route
              path="class/:classUuid/:memberType/:lectureId"
              element={<LecturePage />}
            />
          </Routes>
        </Router>
      </SocketProvider>
    </div>
  );
};
export default App;
