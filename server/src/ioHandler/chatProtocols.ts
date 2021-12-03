import ClassManager from '../data/classManager';
import { CustomSocket } from '../types';

const OnLiveChatTextMessage =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    const { classUuid, currentUserName, textMessage, lectureId } =
      JSON.parse(request);
    const cls = await classManager.getOrCreateClass(classUuid);
    const lecture = cls.getLectureById(lectureId);
    const payload = {
      dateStr: new Date().toISOString(),
      textMessage,
      chatUserName: currentUserName
    };
    socket.emit('LiveChatTextMessage', {
      message: { ...payload, isMy: true },
      status: 200
    });
    socket.to(lecture.getSocketRoomName()).emit('LiveChatTextMessage', {
      message: { ...payload, isMy: false },
      status: 200
    });
  };

const OnTimeMarkerClicked =
  (socket: CustomSocket) =>
  // (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    const { markerId, markerType } = JSON.parse(request);
    // const cls = await classManager.getOrCreateClass(classUuid);
    socket.emit('TimeMarkerClicked', markerId, markerType);
    // Listening on 'client/src/components/chat.tsx'
  };

export default { OnLiveChatTextMessage, OnTimeMarkerClicked };
