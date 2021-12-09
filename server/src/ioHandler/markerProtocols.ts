import ClassManager from '../data/classManager';
import MarkerEntity from '../entity/markerEntity';
import MarkerTextMessageEntity from '../entity/markerTextMessageEntity';
import { detectLanguage, translate } from '../externalAPI/PapagoAPI';
import Logger from '../loader/logger';
import {
  CreateMarkerRequest,
  CustomSocket,
  Language,
  MarkerTextMessageInterface,
  MarkerTextMessageRequest,
  Message
} from '../types';

const OnCreateMarker =
  (socket: CustomSocket, classManager: ClassManager) =>
  async ({
    classUuid,
    lectureId,
    marker: { markerType, videoIndex, time }
  }: CreateMarkerRequest) => {
    try {
      const cls = await classManager.getOrCreateClass(classUuid);
      const lecture = cls.getLectureById(lectureId);

      const member = cls.getMemberById(socket.request.user!.id);

      const markerEntity = new MarkerEntity();
      // FIXME!
      markerEntity.markerType = markerType;
      markerEntity.time = time;
      markerEntity.videoIndex = videoIndex;
      markerEntity.creator = await member.getEntity();
      markerEntity.lecture = await lecture.getEntity();
      const savedMarker = await markerEntity.save();
      const marker = await lecture.addMarker(savedMarker);

      const payload = { marker, status: 200 };
      socket.to(lecture.getSocketRoomName()).emit('CreateMarker', payload);
      socket.emit('CreateMarker', payload);
    } catch (e) {
      Logger.error(e);
      socket.emit('CreateMarker', { message: e, status: 400 });
    }
  };

const OnDeleteMarker =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    const { markerId, lectureId, classUuid } = JSON.parse(request);

    const cls = await classManager.getOrCreateClass(classUuid);
    const lecture = cls.getLectureById(lectureId);

    await lecture.deleteMarker(markerId);

    MarkerEntity.delete(markerId);

    const payload = { status: 200, markerId };
    socket.to(lecture.getSocketRoomName()).emit('DeleteMarker', payload);
    socket.emit('DeleteMarker', payload);
  };

// Create new marker text message
const OnMarkerTextMessage =
  (socket: CustomSocket, classManager: ClassManager) =>
  async ({
    classUuid,
    lectureId,
    markerTextMessage
  }: MarkerTextMessageRequest) => {
    try {
      const cls = await classManager.getOrCreateClass(classUuid);
      const lecture = cls.getLectureById(lectureId);
      const { user } = socket.request;

      const { markerId, message: text }: MarkerTextMessageInterface =
        markerTextMessage;

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

      const marker = await lecture.getMarker(markerId);

      const markerTextMessageEntity = new MarkerTextMessageEntity();
      markerTextMessageEntity.marker = await marker.getEntity();
      markerTextMessageEntity.ko = ko.result;
      markerTextMessageEntity.en = en.result;
      markerTextMessageEntity.user = socket.request.user!;
      const savedMessageEntity = await markerTextMessageEntity.save();
      marker.addTextMessage(savedMessageEntity, user!.id);

      const savedMessage: Message & { messageId: number } = {
        messageId: savedMessageEntity.id,
        dateStr: new Date(savedMessageEntity.createdAt).toISOString(),
        text: { ko, en },
        senderName: savedMessageEntity.user.userName, // ⚡️ creator of this message - user relation 필요
        senderId: savedMessageEntity.user.id // ⚡️ creator of this message - user relation 필요
      };

      const payload = {
        markerId,
        savedMessage,
        status: 200
      };
      socket.to(lecture.getSocketRoomName()).emit('MarkerTextMessage', payload);
      socket.emit('MarkerTextMessage', payload);
    } catch (e) {
      Logger.error(e);
      socket.emit('MarkerTextMessage', { message: e, status: 400 });
    }
  };

const OnGetMarkerMessages =
  (socket: CustomSocket) =>
  async ({ markerId }: { markerId: number }) => {
    try {
      const textMessageEntities = await MarkerTextMessageEntity.find({
        where: { marker: { id: markerId } },
        relations: ['marker', 'user']
      });

      const textMessages = textMessageEntities.map(msgEntity => ({
        messageId: msgEntity.id,
        dateStr: new Date(msgEntity.createdAt).toISOString(),
        text: {
          ko: { result: msgEntity.ko, status: 200 },
          en: { result: msgEntity.en, status: 200 }
        },
        senderName: msgEntity.user.userName, // ⚡️ creator of this message - user relation 필요
        senderId: msgEntity.user.id // ⚡️ creator of this message - user relation 필요
      }));

      socket.emit('GetMarkerMessages', { textMessages, status: 200 });
    } catch (e) {
      Logger.error(e);
      socket.emit('GetMarkerMessages', { message: e, status: 400 });
    }
  };

const OnGetMarkers =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: any) => {
    try {
      const { classUuid, lectureId, videoIndex: clientIdx } = request;
      const cls = await classManager.getOrCreateClass(classUuid);
      const lecture = cls.getLectureById(lectureId);
      const markers = (await lecture.getMarkers()).filter(
        ({ videoIndex }) => clientIdx === videoIndex
      );
      socket.emit('GetMarkers', {
        markers,
        status: 200
      });
    } catch (e) {
      Logger.error(e);
      socket.emit('GetMarkers', { message: e, status: 400 });
    }
  };

export default {
  OnCreateMarker,
  OnDeleteMarker,
  OnMarkerTextMessage,
  OnGetMarkerMessages,
  OnGetMarkers
};
