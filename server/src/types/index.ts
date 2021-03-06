import { IncomingMessage } from 'http';
import { Socket } from 'socket.io';
import { Express } from 'express';

type uuid = string;

export type classUuid = uuid;

export enum Language {
  KO = 'ko',
  EN = 'en'
}

export interface CustomSocket extends Socket {
  request: IncomingMessage & { user?: Express.User };
}

export interface Message {
  dateStr: string;
  text: {
    ko: {
      result: string;
      status: number;
    };
    en: {
      result: string;
      status: number;
    };
  };
  senderName: string;
  senderId: number;
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
  lectureId: number;
}

export interface SelectVideoRequest extends InLectureRequestInterface {
  selectedVideoIdx: number;
}

export interface LiveChatTextMessageRequest extends InLectureRequestInterface {
  text: string;
}

export interface SetLanguageRequest extends InClassRequestInterface {
  language: Language;
}

export interface LiveChatAudioMessageInterface
  extends InLectureRequestInterface {
  arrayBuffer: ArrayBuffer;
}

export interface TranslateRequestInterface {
  translateArray: string[];
  target: Language;
}

export interface PapagoTranslateResponse {
  message: {
    '@type': string;
    '@service': string;
    '@version': string;
    result: {
      srcLangType: Language;
      tarLangType: Language;
      translatedText: string;
      engineType: string;
      pivot: any;
    };
  };
}

export interface CreateLectureRequest extends InClassRequestInterface {
  lectureDate: Date;
  lectureName: string;
  playlist: string;
}

export interface SetLectureLiveStatusRequest extends InLectureRequestInterface {
  status: boolean;
}

export interface PapagoLanguageDetectionResponse {
  langCode: Language | string;
}

export interface MarkerRequest {
  markerType: MarkerType;
  videoIndex: number;
  time: number;
}

export interface CreateMarkerRequest extends InLectureRequestInterface {
  marker: MarkerRequest;
}

export interface MarkerTextMessageRequest extends InLectureRequestInterface {
  markerTextMessage: MarkerTextMessageInterface;
}
