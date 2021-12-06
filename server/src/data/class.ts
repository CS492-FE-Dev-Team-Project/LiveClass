import ClassEntity from '../entity/classEntity';
import { classUuid } from '../types';
import Member from './member';

import LectureEntity from '../entity/lectureEntity';
import Lecture from './lecture';
import Logger from '../loader/logger';

class Class {
  public readonly uuid: classUuid;

  public readonly title: string;

  public readonly subtitle: string;

  private members: Member[] = [];

  private chatMassages: { studentId: number; time: Date; message: string }[] =
    [];

  private LiveStatus: boolean = false;

  // Lecture related variable
  private lectures: Lecture[] = [];

  constructor(classEntity: ClassEntity) {
    const { uuid, title, subtitle } = classEntity;
    this.uuid = uuid;
    this.title = title;
    this.subtitle = subtitle;
    this.members = classEntity.members.map(clsMember => new Member(clsMember));
    this.lectures = classEntity.lectures.map(lecture => new Lecture(lecture));
  }

  public getMembers(): Member[] {
    return this.members;
  }

  public getMemberById(memberId: number): Member {
    const memberFound = this.members.find(({ userId }) => userId === memberId);
    if (!memberFound) {
      throw new Error('Member Not Found');
    }
    return memberFound;
  }

  public exitUser(userId: number): boolean {
    const member = this.getMemberById(userId);
    Logger.info(`User ${member.userName} Exit Class ${this.title}`);
    if (!member) {
      return false;
    }
    this.lectures.forEach(lecture => lecture.exitParticipant(userId));

    member?.setConnectStatus(false);

    return true;
  }

  public getMessages(offset: number, length: number) {
    return this.chatMassages.slice(offset, offset + length);
  }

  public getSocketRoomName() {
    return `class_${this.uuid}`;
  }

  public isLive() {
    return this.LiveStatus;
  }

  public setLiveStatus(liveStatus: boolean) {
    this.LiveStatus = liveStatus;
    return this.LiveStatus;
  }

  // Lecture related methods
  public getLectures(): Lecture[] {
    return this.lectures;
  }

  public getLectureById(lectureId: number): Lecture {
    const lecture = this.lectures.find(({ id }) => id === lectureId);
    if (!lecture) {
      throw new Error('No Such Lecture');
    }
    return lecture;
  }

  public addLecture(lecture: LectureEntity): Lecture {
    const newLecture = new Lecture(lecture);
    this.lectures.push(newLecture);

    return newLecture;
  }
}

export default Class;
