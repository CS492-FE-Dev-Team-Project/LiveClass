export interface Class {
  uuid: string;
  title: string;
  subtitle: string;
  memberType: MemberType;
}

export enum MemberType {
  INSTRUCTOR = 'instructor',
  STUDENT = 'student'
}

export enum UserLoadStatus {
  LOADED,
  LOADING,
  NOTLOADED
}

export enum MarkerType {
  QUESTION,
  QUIZ,
  NOTICE,
  DISCUSSION
}
