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

// LeftMenu tabs
export enum TabType {
  USER = 'user',
  VIDEO = 'video',
  NOTICE = 'notice'
}

interface BaseTabEntry {
  tabName: string;
  type: TabType;
}

export interface UserTabEntry extends BaseTabEntry {
  userId: number;
}

export interface VideoTabEntry extends BaseTabEntry {
  videoIdx: number;
  link: string;
}

export interface NoticeTabEntry extends BaseTabEntry {
  message: string;
  onClickHandler?: (...args: any[]) => void;
}

export type TabEntry = UserTabEntry | VideoTabEntry | NoticeTabEntry;

export interface TabSegment {
  tabTitle: string;
  tabContents: TabEntry[];
}
