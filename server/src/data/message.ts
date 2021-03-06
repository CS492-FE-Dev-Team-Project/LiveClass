/* eslint-disable max-classes-per-file */

import MarkerTextMessageEntity from '../entity/markerTextMessageEntity';

enum MessageType {
  TEXT,
  AUDIO
}

class BaseMarkerMessage {
  public readonly createdAt: Date;

  public readonly senderId: number;

  public readonly messageType: MessageType;

  constructor(createdAt: Date, senderId: number, messageType: MessageType) {
    this.createdAt = createdAt;
    this.senderId = senderId;
    this.messageType = messageType;
  }
}

class MarkerTextMessage extends BaseMarkerMessage {
  public readonly ko: string;

  public readonly en: string;

  public readonly markerId: number;

  constructor(textMessage: MarkerTextMessageEntity, senderId: number) {
    const {
      createdAt,
      ko,
      en,
      marker: { id }
    } = textMessage;
    super(createdAt, senderId, MessageType.TEXT);
    this.ko = ko;
    this.en = en;
    this.markerId = id;
  }
}

// FIXME!
class MarkerAudioMessage extends BaseMarkerMessage {
  public readonly url: string;

  public readonly markerId: number;

  constructor(textMessage: MarkerAudioMessage, senderId: number) {
    const { url, markerId, createdAt } = textMessage;
    super(createdAt, senderId, MessageType.TEXT);
    this.url = url;
    this.markerId = markerId;
  }
}

export { MarkerTextMessage, MarkerAudioMessage };
