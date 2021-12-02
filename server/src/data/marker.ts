import MarkerEntity from '../entity/markerEntity';
import { MarkerType } from '../types';

class Marker {
  public readonly id: number;

  public readonly markerType: MarkerType;

  constructor(markerEntity: MarkerEntity) {
    const { id, markerType } = markerEntity;
    this.id = id;
    this.markerType = markerType;
  }
}

export default Marker;
