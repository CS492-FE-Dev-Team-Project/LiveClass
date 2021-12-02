import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import SocketContext from './socketContext';
import { SocketOptionType } from './types';

SocketProvider.defaultProps = {
  options: null
};

function SocketProvider({
  url,
  children,
  options,
  debug = true
}: {
  url: string;
  children: any;
  options?: SocketOptionType;
  debug?: boolean;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  const [eventMsgRecord, setEventMsgRecord] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    const newSocket: Socket = io(url, options);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setConnected(true);
    });

    newSocket.on('disconnect', () => {
      newSocket.removeAllListeners();
      setConnected(false);
    });

    newSocket.on('error', err => {
      setError(err);
    });

    if (debug) {
      newSocket.onAny((event, ...any) => {
        console.log(event, any);
      });
    }

    return () => {
      setSocket(null);
      newSocket.disconnect();
    };
  }, [url, options]);

  const getSocket = () => socket;
  const getConnected = () => connected;
  const getError = () => error;

  const setEventMsg = (event: string, msg: string) => {
    setEventMsgRecord({ ...eventMsgRecord, [event]: msg });
  };
  const subscribeEvent = (event: string) => {
    socket?.on(event, (msg: string) => {
      setEventMsg(event, msg);
    });
  };
  const getEventMsg = (event: string) => eventMsgRecord[event];

  return (
    <SocketContext.Provider
      value={{
        getSocket,
        getConnected,
        getError,
        subscribeEvent,
        getEventMsg
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
