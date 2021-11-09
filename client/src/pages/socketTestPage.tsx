import React, { useState, useEffect } from 'react';
import { SocketProvider, useSocket } from '../lib/socket';

interface TextMessage {
  time: string;
  textMessage: string;
}

const SocketTestPage = () => {
  const [inputText, setInputText] = useState('');
  const [msgs, setMsgs] = useState<TextMessage[]>([]);
  const { socket, connected } = useSocket();

  useEffect(() => {
    socket?.on('ChatTextMessage', (data: TextMessage) => {
      setMsgs(arr => [...arr, data]);
    });
    socket?.emit('JoinLecture', '{ "lectureId": 10 }');
  }, [connected]);

  return (
    <>
      <input
        type="text"
        onChange={e => {
          setInputText(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          const JO = JSON.stringify({
            lectureId: 10,
            textMessage: inputText
          });
          socket?.emit('ChatTextMessage', JO);
        }}
      >
        Send Msg
      </button>
      {msgs.map(({ time, textMessage }) => (
        <div key={time}>{`${time}: ${textMessage}`}</div>
      ))}
    </>
  );
};

export default (
  <SocketProvider url="localhost:5000">
    <SocketTestPage />
  </SocketProvider>
);
