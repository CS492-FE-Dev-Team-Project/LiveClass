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

export interface MessageResponse {
  messageId: number;
  senderId: number;
  senderName: string;
  dateStr: string;
}

export interface TextMessageResponse extends MessageResponse {
  text: string;
}

export interface AudioMessageResponse extends MessageResponse {
  url: string;
}

export interface Marker {
  id: number;
  markerType: MarkerType;
  time: number;
  videoIndex: number;
  messages: MessageResponse[];
}

export enum LanguageType {
  EN,
  KO
}
