import React, { useEffect } from 'react';
import { markerInfo } from './youtube'; // props type
import { useSocket } from '../lib/socket';

const timeline = ({ id, time }: markerInfo) => {
  const { socket } = useSocket();

  // Click handler - Send click event through Socket, to Chat component
  const onClickEvt = () => {
    const payload = JSON.stringify({ markerId: id });

    // send 'markerId' of clicked marker to Chat component
    socket?.emit('TimeMarkerClicked', payload);
  };

  return (
    <button
      className="timeline-flag"
      style={{
        left: `${time}%` /* ratio of current time to video duration */
      }}
      type="button"
      aria-label="timeline"
      onClick={() => onClickEvt()}
    />
  );
};

export default timeline;
