import React from 'react';
import { Button } from 'antd';
import './App.css';
import LobbyPage from './pages/lobbyPage-Chakra';

const App = (): React.ReactElement<any, any> => {
  return (
    <div className="App">
      <LobbyPage />
    </div>
  );
};

export default App;
