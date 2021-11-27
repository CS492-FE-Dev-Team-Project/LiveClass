import ClassEntity from '../entity/classEntity';
import ClassMember from '../entity/classMemberEntity';
import { classUuid } from '../types';
import Student from './student';

class Class {
  public readonly uuid: classUuid;

  public readonly title: string;

  public readonly subtitle: string;

  private students: Student[] = [];

  private chatMassages: { studentId: number; time: Date; message: string }[] =
    [];

  private LiveStatus: boolean = false;

  constructor(classEntity: ClassEntity) {
    const { uuid, title, subtitle } = classEntity;
    this.uuid = uuid;
    this.title = title;
    this.subtitle = subtitle;
  }

  public addStudent(member: ClassMember): Student {
    if (!member.member) {
      throw new Error('Need to fetch User');
    }
    const newStudent = new Student(member);
    this.students.push(newStudent);

    return newStudent;
  }

  public getStudent(userId: number): Student | undefined {
    return this.students.find(({ id }) => id === userId);
  }

  public exitUser(userId: number): boolean {
    const students = this.students.filter(({ id }) => id !== userId);
    const success = students.length < this.students.length;
    this.students = students;

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
}

export default Class;
