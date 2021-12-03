import ClassManager from '../data/classManager';
import MarkerEntity from '../entity/markerEntity';
import MarkerTextMessageEntity from '../entity/markerTextMessageEntity';
import { CustomSocket, MarkerTextMessageInterface } from '../types';

const OnCreateMarker =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    const {
      classUuid,
      lectureId,
      marker: { markerType, videoIndex, time }
    } = JSON.parse(request);
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

const OnMarkerTextMessage =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: string) => {
    const { classUuid, lectureId, markerTextMessage } = JSON.parse(request);
    const cls = await classManager.getOrCreateClass(classUuid);
    const lecture = cls.getLectureById(lectureId);
    const { user } = socket.request;

    const { markerId, message }: MarkerTextMessageInterface = markerTextMessage;
    const marker = await lecture.getMarker(markerId);

    const markerTextMessageEntity = new MarkerTextMessageEntity();
    markerTextMessageEntity.marker = await marker.getEntity();
    markerTextMessageEntity.message = message;
    const savedMessage = await markerTextMessageEntity.save();

    marker.addTextMessage(savedMessage, user!.id);

    const payload = { savedMessage, status: 200 };
    socket.to(lecture.getSocketRoomName()).emit('MarkerTextMessage', payload);
    socket.emit('MarkerTextMessage', payload);
  };

const OnGetMarkerMessages =
  (socket: CustomSocket) => async (request: string) => {
    const { markerId } = JSON.parse(request);
    const textMessages = await MarkerTextMessageEntity.find({
      where: { marker: { id: markerId } }
    });
    socket.emit('MarkerMessages', { textMessages, status: 200 });
  };

const OnGetMarkers =
  (socket: CustomSocket, classManager: ClassManager) =>
  async (request: any) => {
    const { classUuid, lectureId } = request;
    const cls = await classManager.getOrCreateClass(classUuid);
    const lecture = cls.getLectureById(lectureId);
    const markers = await lecture.getMarkers();
    socket.emit('GetMarkers', {
      markers,
      status: 200
    });
  };

export default {
  OnCreateMarker,
  OnDeleteMarker,
  OnMarkerTextMessage,
  OnGetMarkerMessages,
  OnGetMarkers
};
