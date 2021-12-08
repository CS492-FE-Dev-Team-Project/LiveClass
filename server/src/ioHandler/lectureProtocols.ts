import Class from '../data/class';
import ClassManager from '../data/classManager';
import Lecture from '../data/lecture';
import Logger from '../loader/logger';
import { CustomSocket, InLectureRequestInterface } from '../types';

const OnJoinLecture =
  (socket: CustomSocket, classManager: ClassManager) =>
  async ({ classUuid, lectureId }: InLectureRequestInterface) => {
    try {
      const cls: Class = await classManager.getOrCreateClass(classUuid);
      const lecture: Lecture = cls.getLectureById(lectureId);

      if (lecture.addParticipant(cls.getMemberById(socket.request.user!.id))) {
        Logger.debug(
          `Join Lecture:\nLecture: ${JSON.stringify(lecture, null, 2)}`
        );
        socket.join(lecture.getSocketRoomName());
        socket.to(lecture.getSocketRoomName()).emit('JoinLecture', {
          user: socket.request.user,
          lecture,
          status: 200
        });
        socket.emit('JoinLecture', {
          user: socket.request.user,
          lecture,
          status: 200
        });
      } else {
        socket.emit('JoinLecture', {
          user: socket.request.user,
          lecture,
          status: 200
        });
      }
    } catch (e) {
      Logger.error(e);
      socket.emit('JoinLecture', { message: e, status: 400 });
    }
  };

const OnExitLecture =
  (socket: CustomSocket, classManager: ClassManager) =>
  async ({ classUuid, lectureId }: InLectureRequestInterface) => {
    try {
      const cls = await classManager.getOrCreateClass(classUuid);
      const lecture = cls.getLectureById(lectureId);

      const member = lecture.exitParticipant(socket.request.user?.id!);

      socket.to(lecture.getSocketRoomName()).emit('GetActiveLectureMember', {
        member,
        status: 200
      });
    } catch (e) {
      Logger.error(e);
    }
  };

const GetActiveLectureMember =
  (socket: CustomSocket, classManager: ClassManager) =>
  async ({ classUuid, lectureId }: InLectureRequestInterface) => {
    try {
      const cls = await classManager.getOrCreateClass(classUuid);
      const lecture = cls.getLectureById(lectureId);

      socket.emit('GetActiveLectureMember', {
        members: lecture.getParticipants(),
        status: 200
      });
    } catch (e) {
      Logger.error(e);
      socket.emit('GetActiveLectureMember', { message: e, status: 400 });
    }
  };

const OnSetLectureLiveStatus =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    try {
      const { classUuid, lectureId, status } = JSON.parse(request);
      const cls: Class = await classManager.getOrCreateClass(classUuid);

      const lecture: Lecture = cls.getLectureById(lectureId);
      const liveStatus = lecture.setLiveStatus(status);

      socket
        .to(lecture.getSocketRoomName())
        .emit('SetLectureLiveStatus', { liveStatus, status: 200 });
      socket.emit('SetLectureLiveStatus', { liveStatus, status: 200 });
    } catch (e) {
      Logger.error(e);
      socket.emit('SetLectureLiveStatus', { message: e, status: 400 });
    }
  };

export default {
  GetActiveLectureMember,
  OnJoinLecture,
  OnExitLecture,
  OnSetLectureLiveStatus
};
