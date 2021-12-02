import { Server as SocketIOServer } from 'socket.io';
import ClassManager from '../data/classManager';
import Logger from '../loader/logger';
import { CustomSocket } from '../types';
import ChatProtocols from './chatProtocols';
import ClassProtocols from './classProtocols';
import YoutubeProtocols from './youtubeProtocols';

// const OnTimeMarkerClicked =
//   (socket: Socket, classManager: ClassManager) => async (request: string) => {
//     const { classUuid, markerId } = JSON.parse(request);
//     const cls = await classManager.getOrCreateClass(classUuid);
//     socket.emit('TimeMarkerClicked', {
//       messages: { markerId, cls }
//     });
//     // Listening on 'client/src/components/chat.tsx'
//   };

export default (io: SocketIOServer, classManager: ClassManager) => {
  io.on('connection', (socket: CustomSocket) => {
    const { user } = socket.request;
    Logger.info(`User connected: ${user?.userName}`);

    socket.onAny((eventName, ...args) => {
      Logger.debug(
        `${user?.userName}: ${eventName}\n data: ${JSON.stringify(args)}`
      );
    });

    socket.on('disconnect', () => {
      socket.disconnect();
      if (user) {
        Logger.info(`User ${user.userName} Disconnected`);
        const cls = classManager.findUserClass(user.id);
        if (cls) {
          cls.exitUser(user.id);
        }
      }
    });

    socket.on('JoinClass', ClassProtocols.OnJoinClass(socket, classManager));
    socket.on(
      'ChatTextMessage',
      ChatProtocols.OnChatTextMessage(socket, classManager)
    );

    // client/components/youtube.tsx
    socket.on(
      'InstructorTimeChange',
      YoutubeProtocols.OnInstructorTimeChange(socket, classManager)
    );
    socket.on(
      'InstructorPlay',
      YoutubeProtocols.OnInstructorPlayPause(socket, true, classManager)
    );
    socket.on(
      'InstructorPause',
      YoutubeProtocols.OnInstructorPlayPause(socket, false, classManager)
    );

    // client/components/timeMarker.tsx
    // socket.on('TimeMarkerClicked', OnTimeMarkerClicked(socket, classManager));
  });
};
