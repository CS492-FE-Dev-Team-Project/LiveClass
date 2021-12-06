import LectureEntity from '../entity/lectureEntity';
import MarkerEntity from '../entity/markerEntity';
import Logger from '../loader/logger';
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

  private markerLoadPromise: Promise<void>;

  constructor(lectureEntity: LectureEntity) {
    const { id, lectureDate, lectureName, playlist } = lectureEntity;
    this.id = id;
    this.lectureDate = lectureDate;
    this.lectureName = lectureName;
    this.playlist = playlist;
    this.markerLoadPromise = this.loadMarkers();
  }

  public async addMarker(marker: MarkerEntity): Promise<Marker> {
    const newMarker = new Marker(marker);
    await this.markerLoadPromise;

    this.markers.push(newMarker);

    return newMarker;
  }

  public async deleteMarker(markerId: number) {
    await this.markerLoadPromise;

    this.markers = this.markers.filter(({ id }) => id !== markerId);
  }

  public async getMarker(markerId: number): Promise<Marker> {
    await this.markerLoadPromise;

    const marker = this.markers.find(({ id }) => id === markerId);
    if (!marker) {
      throw new Error('No Such Marker');
    }
    return marker;
  }

  public async loadMarkers(): Promise<void> {
    const markers = await MarkerEntity.find({
      where: { lecture: { id: this.id } }
    });

    this.markers = markers.map(markerEntity => new Marker(markerEntity));
  }

  public async getMarkers() {
    await this.markerLoadPromise;

    return this.markers;
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

  public addParticipant(member: Member): boolean {
    if (!this.participants.find(({ userId }) => userId === member.userId)) {
      this.participants.push(member);
      Logger.info(`User ${member?.userName} Join Class ${this.lectureName}`);
      member.setParticipatingLecture(this.id);
      return true;
    }
    Logger.info(
      `User ${member?.userName} is Already in Class ${this.lectureName}`
    );
    return false;
  }

  public exitParticipant(id: number): Member | undefined {
    const member = this.participants.find(({ userId }) => id === userId);
    if (member) {
      Logger.info(`User ${member?.userName} Exit Class ${this.lectureName}`);
      this.participants = this.participants.filter(
        ({ userId }) => id !== userId
      );
    }
    return member;
  }

  public async getEntity(): Promise<LectureEntity> {
    const entity = await LectureEntity.findOne(this.id);
    if (!entity) {
      throw new Error('No Such Lecture');
    }
    return entity;
  }

  public getParticipants(): Member[] {
    return this.participants;
  }
}

export default Lecture;
