import LectureEntity from '../entity/lectureEntity';
import Lecture from '../data/lecture';
import Class from '../data/class';
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

const OnGetLectures =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    const { classUuid } = JSON.parse(request);
    const cls: Class = await classManager.getOrCreateClass(classUuid);

    const allLectureList: Lecture[] = cls.getLectureAll();
    socket.emit('GetLectures', { allLectureList });
  };

const OnCreateLecture =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    const { classUuid, lectureDate, lectureName, playlist } =
      JSON.parse(request);
    const cls: Class = await classManager.getOrCreateClass(classUuid);

    const newLectureEntity: LectureEntity = new LectureEntity();
    newLectureEntity.lectureDate = lectureDate;
    newLectureEntity.lectureName = lectureName;
    newLectureEntity.playlist = playlist;
    newLectureEntity.class = cls.entity;
    const { id } = await newLectureEntity.save();

    cls.addLecture(newLectureEntity); // return - created Lecture instance

    socket.emit('CreateLecture', { id });
  };

const OnJoinLecture =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    const { classUuid, lectureId } = JSON.parse(request);
    const cls: Class = await classManager.getOrCreateClass(classUuid);
    const lecture: Lecture | undefined = cls.getLectureById(
      parseInt(lectureId, 10)
    );

    let status: number = 200;
    if (!lecture) {
      Logger.error(
        `Lecture#${lectureId} not found in class ${cls.title} with id='${cls.uuid}'`
      );
      status = 404;
    }
    socket.emit('JoinLecture', { lecture, status });
  };

export default { OnJoinClass, OnGetLectures, OnCreateLecture, OnJoinLecture };
