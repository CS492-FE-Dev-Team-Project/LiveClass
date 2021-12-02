import ClassEntity from '../entity/classEntity';
import { classUuid } from '../types';
import Member from './member';

import LectureEntity from '../entity/lectureEntity';
import Lecture from './lecture';

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

    if (!member) {
      return false;
    }
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

  public getLectureById(lectureId: number): Lecture | undefined {
    return this.lectures.find(({ id }) => id === lectureId);
  }

  public addLecture(lecture: LectureEntity): Lecture {
    const newLecture = new Lecture(lecture);
    this.lectures.push(newLecture);

    return newLecture;
  }

  // public joinLecture(lectureId: number): Lecture | undefined {
  //   return this.availableLectures.find(({ id }) => id === lectureId);
  // }
}

export default Class;
