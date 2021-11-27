import ClassManager from '../data/classManager';
import { CustomSocket } from '../types';

const OnInstructorTimeChange =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    const { classUuid, newtime } = JSON.parse(request);
    const cls = await classManager.getOrCreateClass(classUuid);
    const clsRoomName = cls.getSocketRoomName();

    socket.to(clsRoomName).emit('InstructorTimeChange', `${newtime}`);
  };

const OnInstructorPlayPause =
  (socket: CustomSocket, isPlay: boolean, classManager: ClassManager) =>
  async (request: string) => {
    const { classUuid } = JSON.parse(request); // argument request: string
    const cls = await classManager.getOrCreateClass(classUuid);
    const clsRoomName = cls.getSocketRoomName();
    socket.to(clsRoomName).emit(isPlay ? 'InstructorPlay' : 'InstructorPause');
  };

export default { OnInstructorPlayPause, OnInstructorTimeChange };
