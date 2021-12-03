import ClassManager from '../data/classManager';
import { CustomSocket } from '../types';

const OnInstructorTimeChange =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    const { classUuid, lectureId, newtime } = JSON.parse(request);
    const cls = await classManager.getOrCreateClass(classUuid);
    const lecture = cls.getLectureById(lectureId);

    socket
      .to(lecture.getSocketRoomName())
      .emit('InstructorTimeChange', `${newtime}`);
  };

const OnInstructorPlayPause =
  (socket: CustomSocket, isPlay: boolean, classManager: ClassManager) =>
  async (request: string) => {
    const { classUuid, lectureId } = JSON.parse(request); // argument request: string
    const cls = await classManager.getOrCreateClass(classUuid);
    const lecture = cls.getLectureById(lectureId);
    socket
      .to(lecture.getSocketRoomName())
      .emit(isPlay ? 'InstructorPlay' : 'InstructorPause');
  };

export default { OnInstructorPlayPause, OnInstructorTimeChange };
