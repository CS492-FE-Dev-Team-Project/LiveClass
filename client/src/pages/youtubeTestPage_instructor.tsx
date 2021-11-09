import React, { useState, useEffect } from 'react';

import YouTube from '../components/youtube';

import { SocketProvider, useSocket } from '../lib/socket';

const YouTubePage = (): React.ReactElement<any, any> => {
  const { socket, connected } = useSocket();
  const [key, setKey] = useState(0);

  useEffect(() => {
    socket?.emit('JoinLecture', '{ "lectureId": 10 }');
    setKey(k => k + 1); // force re-render YouTube component after connection establishment
  }, [connected]);

  // For example
  const user = {
    name: 'Kim',
    studentNumber: -1 // -1
  };

  return (
    <YouTube
      key={key}
      name={user.name}
      studentNumber={user.studentNumber}
      socket={socket}
    />
  );
};
export default YouTubePage;
