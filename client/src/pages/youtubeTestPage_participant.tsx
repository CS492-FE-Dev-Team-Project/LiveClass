import React, { useState, useEffect } from 'react';

import YouTube from '../components/youtube';

import { SocketProvider } from '../lib/socket';

const YouTubePage = (): React.ReactElement<any, any> => {
  // For example
  const user = {
    name: 'Park',
    studentNumber: 123, // -1
    room: 10
  };

  return (
    <YouTube
      name={user.name}
      studentNumber={user.studentNumber}
      room={user.room}
    />
  );
};

export default (
  <SocketProvider url="localhost:5000">
    <YouTubePage />
  </SocketProvider>
);
