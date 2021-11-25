import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginModal from './components/loginModal';
import ClassPage from './pages/classPage';
import LobbyPage from './pages/lobbyPage';

const App = (): React.ReactElement<any, any> => {
  return (
    <div className="App">
      <LoginModal />
      <Router>
        <Routes>
          <Route path="/" element={<LobbyPage />} />
          <Route path="class/:id" element={<ClassPage />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
