import ClassManager from '../data/classManager';
import Logger from '../loader/logger';
import {
  CustomSocket,
  InLectureRequestInterface,
  SelectVideoRequest
} from '../types';

const OnInstructorTimeChange =
  (socket: CustomSocket, classManager: ClassManager) =>
  async ({
    classUuid,
    lectureId,
    newtime
  }: InLectureRequestInterface & { newtime: number }) => {
    try {
      const cls = await classManager.getOrCreateClass(classUuid);
      const lecture = cls.getLectureById(lectureId);

      socket
        .to(lecture.getSocketRoomName())
        .emit('InstructorTimeChange', `${newtime}`);
    } catch (e) {
      Logger.error(e);
      socket.emit('InstructorTimeChange', { message: e, status: 400 });
    }
  };

const OnInstructorPlayPause =
  (socket: CustomSocket, isPlay: boolean, classManager: ClassManager) =>
  async ({ classUuid, lectureId }: InLectureRequestInterface) => {
    Logger.debug(lectureId);
    try {
      const cls = await classManager.getOrCreateClass(classUuid);
      const lecture = cls.getLectureById(lectureId);
      socket
        .to(lecture.getSocketRoomName())
        .emit(isPlay ? 'InstructorPlay' : 'InstructorPause');
    } catch (e) {
      Logger.error(e);
      socket.emit(isPlay ? 'InstructorPlay' : 'InstructorPause', {
        message: e,
        status: 400
      });
    }
  };

const OnSelectVideo =
  (socket: CustomSocket, classManager: ClassManager) =>
  async ({ lectureId, classUuid, selectedVideoIdx }: SelectVideoRequest) => {
    try {
      const cls = await classManager.getOrCreateClass(classUuid);
      const lecture = cls.getLectureById(lectureId);

      lecture.setVideoIdx(selectedVideoIdx);

      socket
        .to(lecture.getSocketRoomName())
        .emit('SelectVideo', { selectedVideoIdx, status: 200 });
    } catch (e) {
      Logger.error(e);
      socket.emit('SelectVideo', { message: e, status: 400 });
    }
  };

export default { OnInstructorPlayPause, OnInstructorTimeChange, OnSelectVideo };
