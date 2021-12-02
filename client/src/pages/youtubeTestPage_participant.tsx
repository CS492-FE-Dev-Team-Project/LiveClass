import React from 'react';

import YouTube from '../components/youtube';

import { SocketProvider } from '../context/socket';
import { MemberType } from '../types';

import ChatTestPage from './chatTestPage';

const YouTubePage = (): React.ReactElement<any, any> => {
  // Participant example
  const user = {
    name: 'Park',
    studentNumber: 123, // -1
    room: 10
  };

  return (
    <YouTube
      memberType={MemberType.STUDENT}
      room="uuid"
      videoId="j1_5ttGRzFs"
      width={300}
      height={200}
    />
  );
};

export default (
  <SocketProvider url="localhost:5000">
    <YouTubePage />
    <ChatTestPage />
  </SocketProvider>
);
