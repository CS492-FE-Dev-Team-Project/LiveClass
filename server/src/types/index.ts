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
