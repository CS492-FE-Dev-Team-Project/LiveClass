import Member from '../data/member';
import LectureEntity from '../entity/lectureEntity';
import Lecture from '../data/lecture';
import Class from '../data/class';
import ClassManager from '../data/classManager';
import Logger from '../loader/logger';
import { CustomSocket } from '../types';
import ClassEntity from '../entity/classEntity';

const OnJoinClass =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    const { classUuid } = JSON.parse(request);
    const { user } = socket.request;
    const cls = await classManager.getOrCreateClass(classUuid);
    cls.getMemberById(user!.id).setConnectStatus(true);

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

    const lectures: Lecture[] = cls.getLectures();
    socket.emit('GetLectures', { lectures, status: 200 });
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
    newLectureEntity.class = await ClassEntity.findOne(classUuid); // 🐛 FIXME!: Do it without querying DB

    const savedLectureEntity = await newLectureEntity.save();

    const lecture: Lecture = cls.addLecture(savedLectureEntity); // return - created Lecture instance

    // Notify other participants in the class that new lecture is created - update menu
    socket.to(cls.getSocketRoomName()).emit('CreateLecture', {
      lecture,
      status: 200
    });

    socket.emit('CreateLecture', { lecture, status: 200 });
  };

const OnGetClassMembers =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    const { classUuid } = JSON.parse(request);
    const cls: Class = await classManager.getOrCreateClass(classUuid);

    const members: Member[] = cls.getMembers();
    socket.emit('GetClassMembers', { members, status: 200 });
  };

export default {
  OnJoinClass,
  OnGetLectures,
  OnCreateLecture,
  OnGetClassMembers
};
