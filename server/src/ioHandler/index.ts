import { Server as SocketIOServer } from 'socket.io';
import ClassManager from '../data/classManager';
import Logger from '../loader/logger';
import { CustomSocket } from '../types';
import ChatProtocols from './chatProtocols';
import ClassProtocols from './classProtocols';
import LectureProtocols from './lectureProtocols';
import YoutubeProtocols from './youtubeProtocols';
import MarkerProtocols from './markerProtocols';

export default (io: SocketIOServer, classManager: ClassManager) => {
  io.on('connection', (socket: CustomSocket) => {
    const { user } = socket.request;
    Logger.info(`User connected: ${user?.userName}`);

    socket.onAny((eventName, ...args) => {
      Logger.debug(
        `${user?.userName}: ${eventName}\n data: ${JSON.stringify(args)}`.slice(
          0,
          500
        )
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
    socket.on(
      'SelectVideo',
      YoutubeProtocols.OnSelectVideo(socket, classManager)
    );

    // In Class API
    socket.on('JoinClass', ClassProtocols.OnJoinClass(socket, classManager));
    socket.on(
      'GetLectures',
      ClassProtocols.OnGetLectures(socket, classManager)
    );
    socket.on(
      'CreateLecture',
      ClassProtocols.OnCreateLecture(socket, classManager)
    );
    socket.on(
      'GetClassMembers',
      ClassProtocols.OnGetClassMembers(socket, classManager)
    );

    // Marker Protocols
    socket.on(
      'CreateMarker',
      MarkerProtocols.OnCreateMarker(socket, classManager)
    );
    socket.on(
      'DeleteMarker',
      MarkerProtocols.OnDeleteMarker(socket, classManager)
    );
    socket.on(
      'MarkerTextMessage',
      MarkerProtocols.OnMarkerTextMessage(socket, classManager)
    );
    socket.on('GetMarkerMessages', MarkerProtocols.OnGetMarkerMessages(socket));
    socket.on('GetMarkers', MarkerProtocols.OnGetMarkers(socket, classManager));

    // Audio Protocols
    socket.on(
      'LiveChatAudioMessage',
      ChatProtocols.OnLiveChatAudioMessage(socket, classManager)
    );
    socket.on(
      'LiveChatTextMessage',
      ChatProtocols.OnLiveChatTextMessage(socket, classManager)
    );
    // client/components/timeMarker.tsx
    socket.on(
      'TimeMarkerClicked',
      // ChatProtocols.OnTimeMarkerClicked(socket, classManager)
      ChatProtocols.OnTimeMarkerClicked(socket)
    );

    // Lecture Protocols
    socket.on(
      'GetActiveLectureMember',
      LectureProtocols.GetActiveLectureMember(socket, classManager)
    );
    socket.on(
      'JoinLecture',
      LectureProtocols.OnJoinLecture(socket, classManager)
    );
    socket.on(
      'ExitLecture',
      LectureProtocols.OnExitLecture(socket, classManager)
    );
    socket.on(
      'SetLectureLiveStatus',
      LectureProtocols.OnSetLectureLiveStatus(socket, classManager)
    );
  });
};
