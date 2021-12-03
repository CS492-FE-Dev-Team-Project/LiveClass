import ClassMemberEntity, { MemberType } from '../entity/classMemberEntity';
import { Language } from '../types';

class Member {
  public readonly userId: number;

  public readonly userName: string;

  public readonly memberType: MemberType;

  private id: number;

  private connectStatus: boolean;

  private participatingLectureId: number;

  private language: Language;

  constructor(member: ClassMemberEntity, language: Language = Language.EN) {
    const {
      memberType,
      member: { userName, id }
    } = member;
    this.userId = id;
    this.userName = userName;
    this.memberType = memberType;
    this.language = language;
    this.connectStatus = false;
    this.id = member.id;
  }

  public getLanguage() {
    return this.language;
  }

  public setLanguage(language: Language) {
    this.language = language;
    return this.language;
  }

  public getConnectStatus() {
    return this.connectStatus;
  }

  public setConnectStatus(status: boolean) {
    this.connectStatus = status;
  }

  public async getEntity(): Promise<ClassMemberEntity> {
    const memberEntity = await ClassMemberEntity.findOne(this.id);
    if (!memberEntity) {
      throw new Error("This User Doesn't Exist");
    }
    return memberEntity;
  }

  public setParticipatingLecture(lectureId: number) {
    this.participatingLectureId = lectureId;
  }
}

export default Member;
