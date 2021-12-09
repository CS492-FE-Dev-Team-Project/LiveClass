import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginModal from './components/loginModal';
import { SocketProvider } from './context/socket';
import ClassPage from './pages/classPage';
import LecturePage from './pages/lecturePage';
import LobbyPage from './pages/lobbyPage';
import AddLecturePage from './components/classroomPage/AddLecturePage';

const App = (): React.ReactElement<any, any> => {
  return (
    <div className="App">
      <SocketProvider url="http://ec2-3-38-83-97.ap-northeast-2.compute.amazonaws.com/">
        <LoginModal />
        <Router>
          <Routes>
            <Route path="/" element={<LobbyPage />} />
            <Route
              path="class/:classUuid/:memberType"
              element={<ClassPage />}
            />
            <Route
              path="class/:classUuid/:memberType/createLecture"
              element={<AddLecturePage />}
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
