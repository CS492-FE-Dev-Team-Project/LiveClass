import ClassManager from '../data/classManager';
import { CustomSocket, SelectVideoRequest } from '../types';

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

const OnSelectVideo =
  (socket: CustomSocket, classManager: ClassManager) =>
  async ({ lectureId, classUuid, selectedVideoIdx }: SelectVideoRequest) => {
    const cls = await classManager.getOrCreateClass(classUuid);
    const lecture = cls.getLectureById(lectureId);

    lecture.setVideoIdx(selectedVideoIdx);

    socket
      .to(lecture.getSocketRoomName())
      .emit('SelectVideo', { selectedVideoIdx, status: 200 });
  };

export default { OnInstructorPlayPause, OnInstructorTimeChange, OnSelectVideo };
