import ClassManager from '../data/classManager';
import { detectLanguage, translate } from '../externalAPI/PapagoAPI';
import Logger from '../loader/logger';
import {
  CustomSocket,
  Language,
  LiveChatAudioMessageInterface,
  LiveChatTextMessageRequest,
  Message
} from '../types';

const OnLiveChatTextMessage =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    try {
      const { classUuid, lectureId, text }: LiveChatTextMessageRequest =
        JSON.parse(request);
      const cls = await classManager.getOrCreateClass(classUuid);
      const lecture = cls.getLectureById(lectureId);
      const { userName, id } = socket.request.user!;

      const ko = await detectLanguage(text).then(({ src, canTranslate }) =>
        canTranslate
          ? translate(src, Language.KO, text)
          : { result: text, status: 200 }
      );
      const en = await detectLanguage(text).then(({ src, canTranslate }) =>
        canTranslate
          ? translate(src, Language.EN, text)
          : { result: text, status: 200 }
      );

      const message: Message = {
        dateStr: new Date().toISOString(),
        text: { ko, en },
        senderName: userName,
        senderId: id
      };
      lecture.addMessage(message);

      socket.emit('LiveChatTextMessage', {
        message,
        status: 200
      });
      socket.to(lecture.getSocketRoomName()).emit('LiveChatTextMessage', {
        message,
        status: 200
      });
    } catch (e) {
      Logger.error(e);
      socket.emit('LiveChatTextMessage', { message: e, status: 400 });
    }
  };

const OnTimeMarkerClicked =
  (socket: CustomSocket) =>
  // (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    try {
      const { markerId, markerType } = JSON.parse(request);
      // const cls = await classManager.getOrCreateClass(classUuid);
      socket.emit('TimeMarkerClicked', markerId, markerType);
    } catch (e) {
      Logger.error(e);
      socket.emit('TimeMarkerClicked', { message: e, status: 400 });
    }
  };

const OnLiveChatAudioMessage =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: LiveChatAudioMessageInterface) => {
    try {
      const { classUuid, lectureId, arrayBuffer } = request;

      const cls = await classManager.getOrCreateClass(classUuid);
      const lecture = cls.getLectureById(lectureId);

      socket.to(lecture.getSocketRoomName()).emit('LiveChatAudioMessage', {
        senderId: socket.request.user?.id,
        arrayBuffer
      });
    } catch (e) {
      Logger.error(e);
      socket.emit('LiveChatAudioMessage', { message: e, status: 400 });
    }
  };

export default {
  OnLiveChatTextMessage,
  OnTimeMarkerClicked,
  OnLiveChatAudioMessage
};
