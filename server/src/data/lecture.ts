import LectureEntity from '../entity/lectureEntity';
import MarkerEntity from '../entity/markerEntity';
// import { classUuid } from '../types';
import Marker from './marker';

class Lecture {
  public readonly id: number;

  public readonly lectureDate: Date;

  public readonly lectureName: string;

  public readonly playlist: string;

  private availableMarkers: Marker[] = [];

  private LiveStatus: boolean = false; // Live를 lecture 쪽에서(도) 설정해주는게 맞을 듯 - 어느 lecture가 현재 live인지

  constructor(lectureEntity: LectureEntity) {
    const { id, lectureDate, lectureName, playlist } = lectureEntity;
    this.id = id;
    this.lectureDate = lectureDate;
    this.lectureName = lectureName;
    this.playlist = playlist;
  }

  public addMarker(marker: MarkerEntity): Marker {
    // if (!Marker.Marker) {
    //   throw new Error('Need to fetch User');
    // }
    const newMarker = new Marker(marker);
    this.availableMarkers.push(newMarker);

    return newMarker;
  }

  public getMarker(userId: number): Marker | undefined {
    return this.availableMarkers.find(({ id }) => id === userId);
  }

  public isLive() {
    return this.LiveStatus;
  }

  public setLiveStatus(liveStatus: boolean) {
    this.LiveStatus = liveStatus;
    return this.LiveStatus;
  }
}

export default Lecture;
