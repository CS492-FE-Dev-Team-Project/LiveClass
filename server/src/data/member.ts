import ClassMember, { MemberType } from '../entity/classMemberEntity';
import { Language } from '../types';

class Member {
  public readonly userId: number;

  public readonly userName: string;

  public readonly memberType: MemberType;

  private connectStatus: boolean;

  private language: Language;

  constructor(member: ClassMember, language: Language = Language.EN) {
    const {
      memberType,
      member: { userName, id }
    } = member;
    this.userId = id;
    this.userName = userName;
    this.memberType = memberType;
    this.language = language;
    this.connectStatus = false;
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
}

export default Member;
