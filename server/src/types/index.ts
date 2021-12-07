import { IncomingMessage } from 'http';
import { Socket } from 'socket.io';
import { Express } from 'express';

type uuid = string;

export type classUuid = uuid;

export enum Language {
  KO = 'KO',
  EN = 'EN'
}

export interface CustomSocket extends Socket {
  request: IncomingMessage & { user?: Express.User };
}

export enum MarkerType {
  QUESTION = 'Question',
  DISCUSSION = 'Discussion'
}

export interface MarkerMessageInterface {
  markerId: number;
}

export interface MarkerTextMessageInterface extends MarkerMessageInterface {
  message: string;
}

export interface MarkerAudioMessageInterface extends MarkerMessageInterface {
  url: string;
}

export interface InClassRequestInterface {
  classUuid: string;
}

export interface InLectureRequestInterface extends InClassRequestInterface {
  lectureId: string;
}

export interface LiveChatAudioMessageInterface
  extends InLectureRequestInterface {
  arrayBuffer: ArrayBuffer;
}
