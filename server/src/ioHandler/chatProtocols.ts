import ClassManager from '../data/classManager';
import {
  CustomSocket,
  LiveChatAudioMessageInterface,
  LiveChatTextMessageRequest
} from '../types';

const OnLiveChatTextMessage =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    const { classUuid, lectureId, text }: LiveChatTextMessageRequest =
      JSON.parse(request);
    const cls = await classManager.getOrCreateClass(classUuid);
    const lecture = cls.getLectureById(lectureId);
    const { userName, id } = socket.request.user!;

    const message = {
      dateStr: new Date().toISOString(),
      text,
      senderName: userName,
      senderId: id
    };
    socket.emit('LiveChatTextMessage', {
      message,
      status: 200
    });
    socket.to(lecture.getSocketRoomName()).emit('LiveChatTextMessage', {
      message,
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

const OnLiveChatAudioMessage =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: LiveChatAudioMessageInterface) => {
    const { classUuid, lectureId, arrayBuffer } = request;

    const cls = await classManager.getOrCreateClass(classUuid);
    const lecture = cls.getLectureById(lectureId);

    socket.to(lecture.getSocketRoomName()).emit('LiveChatAudioMessage', {
      senderId: socket.request.user?.id,
      arrayBuffer
    });
  };

export default {
  OnLiveChatTextMessage,
  OnTimeMarkerClicked,
  OnLiveChatAudioMessage
};
