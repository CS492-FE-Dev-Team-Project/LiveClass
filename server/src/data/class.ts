import ClassEntity from '../entity/classEntity';
import ClassMember from '../entity/classMemberEntity';
import { classUuid } from '../types';
import Member from './member';

import LectureEntity from '../entity/lectureEntity';
import Lecture from './lecture';

class Class {
  public readonly uuid: classUuid;

  public readonly title: string;

  public readonly subtitle: string;

  private connectedMembers: Member[] = [];

  private chatMassages: { studentId: number; time: Date; message: string }[] =
    [];

  private LiveStatus: boolean = false;

  // Lecture related variable
  private availableLectures: Lecture[] = [];

  constructor(classEntity: ClassEntity) {
    const { uuid, title, subtitle } = classEntity;
    this.uuid = uuid;
    this.title = title;
    this.subtitle = subtitle;
  }

  public addMember(member: ClassMember): Member {
    if (!member.member) {
      throw new Error('Need to fetch User');
    }
    const newMember = new Member(member);
    this.connectedMembers.push(newMember);

    return newMember;
  }

  public getMember(userId: number): Member | undefined {
    return this.connectedMembers.find(({ id }) => id === userId);
  }

  public exitUser(userId: number): boolean {
    const students = this.connectedMembers.filter(({ id }) => id !== userId);
    const success = students.length < this.connectedMembers.length;
    this.connectedMembers = students;

    return success;
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
  public getLecture(lectureId: number): Lecture | undefined {
    return this.availableLectures.find(({ id }) => id === lectureId);
  }

  public addLecture(lecture: LectureEntity): Lecture {
    // if (!member.member) {
    //   throw new Error('Need to fetch User');
    // }
    const newLecture = new Lecture(lecture);
    this.availableLectures.push(newLecture);

    return newLecture;
  }

  // public joinLecture(lectureId: number): Lecture | undefined {
  //   return this.availableLectures.find(({ id }) => id === lectureId);
  // }
}

export default Class;
