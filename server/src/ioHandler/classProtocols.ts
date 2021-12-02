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
    newLectureEntity.class = new ClassEntity();

    // FIXME!: Do it without querying DB
    newLectureEntity.class.uuid = await ClassEntity.findOne(classUuid);
    const savedLectureEntity = await newLectureEntity.save();

    cls.addLecture(savedLectureEntity); // return - created Lecture instance

    socket.emit('CreateLecture', { id: savedLectureEntity.id, status: 200 });
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

    lecture!.addParticipant(cls.getMemberById(socket.request.user!.id));
    Logger.debug(`Join Lecture:\nLecture: ${JSON.stringify(lecture, null, 2)}`);
    socket.join(lecture!.getSocketRoomName());
    socket
      .to(lecture!.getSocketRoomName())
      .emit('JoinLecture', { user: socket.request.user, lecture, status });
    socket.emit('JoinLecture', { user: socket.request.user, lecture, status });
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
  OnJoinLecture,
  OnGetClassMembers
};
