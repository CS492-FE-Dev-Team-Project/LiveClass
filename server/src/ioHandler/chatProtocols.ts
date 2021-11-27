import ClassManager from '../data/classManager';
import { CustomSocket } from '../types';

const OnChatTextMessage =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    const { classUuid, textMessage } = JSON.parse(request);
    const cls = await classManager.getOrCreateClass(classUuid);
    const clsRoomName = cls.getSocketRoomName();
    socket.emit('ChatTextMessage', {
      time: new Date().toISOString(),
      textMessage
    });
    socket.to(clsRoomName).emit(textMessage);
  };

export default { OnChatTextMessage };
