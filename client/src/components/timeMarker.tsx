import React, { useEffect } from 'react';
import { markerInfo } from './youtube'; // props type
import { useSocket } from '../context/socket';

const timeline = ({ id, time, type }: markerInfo) => {
  const { socket } = useSocket();

  // Click handler - Send click event through Socket, to Chat component
  const onClickEvt = () => {
    const payload = JSON.stringify({ markerId: id, markerType: type });

    // send 'markerId' of clicked marker to Chat component
    socket?.emit('TimeMarkerClicked', payload);
  };

  const colorPick = ['red', 'blue'];

  return (
    <button
      className="timeline-marker"
      style={{
        left: `${time}%` /* ratio of current time to video duration */,
        backgroundColor: colorPick[type]
      }}
      type="button"
      aria-label="timeline"
      onClick={() => onClickEvt()}
    />
  );
};

export default timeline;
