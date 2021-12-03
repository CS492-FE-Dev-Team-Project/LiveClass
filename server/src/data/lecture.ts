import LectureEntity from '../entity/lectureEntity';
import MarkerEntity from '../entity/markerEntity';
// import { classUuid } from '../types';
import Marker from './marker';
import Member from './member';

class Lecture {
  public readonly id: number;

  public readonly lectureDate: Date;

  public readonly lectureName: string;

  public readonly playlist: string;

  private participants: Member[] = [];

  private markers: Marker[] = [];

  private LiveStatus: boolean = false; // Live를 lecture 쪽에서(도) 설정해주는게 맞을 듯 - 어느 lecture가 현재 live인지

  constructor(lectureEntity: LectureEntity) {
    const { id, lectureDate, lectureName, playlist } = lectureEntity;
    this.id = id;
    this.lectureDate = lectureDate;
    this.lectureName = lectureName;
    this.playlist = playlist;
  }

  public addMarker(marker: MarkerEntity): Marker {
    const newMarker = new Marker(marker);
    this.markers.push(newMarker);

    return newMarker;
  }

  public deleteMarker(markerId: number) {
    this.markers = this.markers.filter(({ id }) => id === markerId);
  }

  public getMarker(userId: number): Marker {
    const marker = this.markers.find(({ id }) => id === userId);
    if (!marker) {
      throw new Error('No Such Marker');
    }
    return marker;
  }

  public isLive() {
    return this.LiveStatus;
  }

  public setLiveStatus(liveStatus: boolean) {
    this.LiveStatus = liveStatus;
    return this.LiveStatus;
  }

  public getSocketRoomName() {
    return `lecture_${this.id}`;
  }

  public addParticipant(member: Member) {
    this.participants.push(member);
    member.setParticipatingLecture(this.id);
  }

  public async getEntity(): Promise<LectureEntity> {
    const entity = await LectureEntity.findOne(this.id);
    if (!entity) {
      throw new Error('No Such Lecture');
    }
    return entity;
  }
}

export default Lecture;
