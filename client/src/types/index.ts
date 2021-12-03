export interface Class {
  uuid: string;
  title: string;
  subtitle: string;
  memberType: MemberType;
}

export interface Lecture {
  id: number;
  lectureDate: string;
  lectureName: string;
  playlist: string;
  LiveStatus: boolean;
}

export interface Member {
  id: number;
  userName: string;
  memberType: MemberType;
  language: string;
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
  QUESTION = 'Question',
  DISCUSSION = 'Discussion'
}

export interface Message {
  id: number;
}

export interface Marker {
  id: number;
  markerType: MarkerType;
  time: number;
  videoIndex: number;
  messages: Message[];
}
