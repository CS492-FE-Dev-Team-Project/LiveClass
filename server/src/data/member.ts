import ClassMember, { MemberType } from '../entity/classMemberEntity';
import { Language } from '../types';

class Member {
  public readonly id: number;

  public readonly userName: string;

  public readonly memberType: MemberType;

  private language: Language;

  constructor(member: ClassMember, language: Language = Language.EN) {
    const {
      memberType,
      member: { userName, id }
    } = member;
    this.id = id;
    this.userName = userName;
    this.memberType = memberType;
    this.language = language;
  }

  public getLanguage() {
    return this.language;
  }

  public setLanguage(language: Language) {
    this.language = language;
    return this.language;
  }
}

export default Member;
