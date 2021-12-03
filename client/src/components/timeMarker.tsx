import React from 'react';
import { useSocket } from '../context/socket';
import { Marker, MarkerType } from '../types';

const TimeMarker = ({
  id,
  time,
  markerType,
  videoIndex
}: Omit<Marker, 'messages'>) => {
  const { socket } = useSocket();

  // Click handler - Send click event through Socket, to Chat component
  const onClickEvt = () => {
    const payload = JSON.stringify({ markerId: id, markerType });

    // send 'markerId' of clicked marker to Chat component
    socket?.emit('TimeMarkerClicked', payload);
  };

  const colorPick = (markerT: MarkerType) => {
    switch (markerT) {
      case MarkerType.DISCUSSION:
        return 'blue';
      case MarkerType.QUESTION:
        return 'red';
      default:
        throw new Error('Invalid MarkerType');
    }
  };

  return (
    <button
      className="timeline-marker"
      style={{
        left: `${time}%` /* ratio of current time to video duration */,
        backgroundColor: colorPick(markerType)
      }}
      type="button"
      aria-label="timeline"
      onClick={() => onClickEvt()}
    />
  );
};

export default TimeMarker;
