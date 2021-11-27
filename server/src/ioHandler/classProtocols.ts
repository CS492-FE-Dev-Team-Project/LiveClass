import ClassManager from '../data/classManager';
import Logger from '../loader/logger';
import { CustomSocket } from '../types';

const OnJoinClass =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    const { classUuid } = JSON.parse(request);
    const cls = await classManager.getOrCreateClass(classUuid);

    const clsRoomName = cls.getSocketRoomName();
    socket.join(clsRoomName);
    Logger.info(`A User Joined to ${clsRoomName}`);

    socket.emit('JoinClass', { classUuid, status: 200 });
  };

export default { OnJoinClass };
