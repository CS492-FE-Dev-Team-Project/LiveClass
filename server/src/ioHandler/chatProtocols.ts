import ClassManager from '../data/classManager';
import { CustomSocket } from '../types';

const OnChatTextMessage =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    const { classUuid, currentUserName, textMessage } = JSON.parse(request);
    const cls = await classManager.getOrCreateClass(classUuid);
    const clsRoomName = cls.getSocketRoomName();
    const payload = {
      dateStr: new Date().toISOString(),
      textMessage,
      chatUserName: currentUserName
    };
    socket.emit('ChatTextMessage', JSON.stringify({ ...payload, isMy: true }));
    socket
      .to(clsRoomName)
      .emit('ChatTextMessage', JSON.stringify({ ...payload, isMy: false }));
  };

export default { OnChatTextMessage };
