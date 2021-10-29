import { useContext, useEffect, useState } from 'react';
import SocketContext from './socketContext';

const useSocket = () => {
  const { getSocket, getConnected, getError } = useContext(SocketContext);

  //   const [connected, setConnected] = useState(false);

  const socket = getSocket();
  const connected = getConnected();
  const error = getError();

  //   useEffect(() => {
  //     if (connected) {
  //       setConnected(true);
  //     } else {
  //       setConnected(false);
  //     }
  //   }, [isSocketConnected]);

  return { socket, connected, error };
};

const useSocketEvent = (event: string) => {
  const { subscribeEvent, getEventMsg, getSocket } = useContext(SocketContext);

  useEffect(() => {
    subscribeEvent(event);
  });

  const msg = getEventMsg(event);
  const socket = getSocket();

  return { socket, msg };
};

export { useSocket, useSocketEvent };
