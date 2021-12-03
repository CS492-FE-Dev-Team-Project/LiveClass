import MarkerEntity from '../entity/markerEntity';
import MarkerTextMessageEntity from '../entity/markerTextMessageEntity';
import { MarkerType } from '../types';
import { MarkerTextMessage } from './message';

class Marker {
  public readonly id: number;

  public readonly markerType: MarkerType;

  public readonly time: number;

  public readonly videoIndex: number;

  private messages: MarkerTextMessage[] = [];

  constructor(markerEntity: MarkerEntity) {
    const { id, markerType, videoIndex, time } = markerEntity;
    this.id = id;
    this.markerType = markerType;
    this.time = time;
    this.videoIndex = videoIndex;
  }

  public addTextMessage(
    textMessage: MarkerTextMessageEntity,
    senderId: number
  ) {
    const markerTextMessage = new MarkerTextMessage(textMessage, senderId);
    this.messages.push(markerTextMessage);
  }

  public async getEntity(): Promise<MarkerEntity> {
    const markerEntity = await MarkerEntity.findOne(this.id);
    if (!markerEntity) {
      throw new Error('No Such Marker');
    }
    return markerEntity;
  }
}

export default Marker;
