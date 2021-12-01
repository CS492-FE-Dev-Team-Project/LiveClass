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

  public readonly entity: ClassEntity; // Used in creating a new lecture entity - src/ioHandler/classProtocols.ts - 'OnCreateLectures'

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
    this.entity = classEntity;

    this.init();
  }

  public async init() {
    const { uuid } = this;
    const lectureEntityArr = await LectureEntity.createQueryBuilder('lecture')
      .leftJoinAndSelect('lecture.class', 'class')
      .where('class.uuid = :uuid', { uuid })
      .getMany();

    lectureEntityArr.map(lec => this.addLecture(lec));
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
  public getLectureAll(): Lecture[] {
    return this.availableLectures;
  }

  public getLectureById(lectureId: number): Lecture | undefined {
    return this.availableLectures.find(({ id }) => id === lectureId);
  }

  public addLecture(lecture: LectureEntity): Lecture {
    const newLecture = new Lecture(lecture);
    this.availableLectures.push(newLecture);

    return newLecture;
  }

  // public joinLecture(lectureId: number): Lecture | undefined {
  //   return this.availableLectures.find(({ id }) => id === lectureId);
  // }
}

export default Class;
