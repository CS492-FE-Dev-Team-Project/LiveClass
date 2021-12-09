import React from 'react';
import { useSocket } from '../context/socket';
import { Marker, MarkerType } from '../types';

interface FlagProps {
  color: string;
}

const FlagSVG: React.FC<FlagProps> = ({ color }) => {
  return (
    <svg
      width="26"
      height="42"
      viewBox="0 0 26 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="FlagSVGStroke"
        d="M0.25 41.75V1.35983C0.478428 0.930839 0.673497 0.640584 0.845353 0.461995C1.02353 0.276835 1.14455 0.243676 1.22836 0.250958C1.32482 0.259338 1.46095 0.327377 1.65137 0.532983C1.82818 0.723902 2.02343 1.00219 2.25 1.36856V41.75H0.25Z"
        fill={color}
        stroke="black"
        strokeWidth="0.5"
      />
      <path
        id="FlagSVGStroke"
        d="M0.25 20.8038V3.86704C5.79233 6.03311 9.95189 6.92656 13.8517 6.82338C17.6706 6.72233 21.2189 5.66585 25.5464 3.95051C24.221 7.25607 23.5865 9.87565 23.6068 12.4474C23.6276 15.0852 24.3371 17.6498 25.6573 20.8285C20.9883 21.9986 17.2644 22.6277 13.4138 22.6521C9.53251 22.6767 5.51003 22.087 0.25 20.8038Z"
        fill={color}
        stroke="black"
        strokeWidth="0.5"
      />
    </svg>
  );
};

const TimeMarker = ({
  id,
  time,
  markerType,
  videoIndex
}: Omit<Marker, 'messages'>) => {
  const { socket } = useSocket();

  // Click handler - Send click event through Socket, to Chat component
  const onClickEvt = () => {
    const payload = { markerId: id, markerType };

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
        left: `${time}%` /* ratio of current time to video duration */
      }}
      type="button"
      aria-label="timeline"
      onClick={() => onClickEvt()}
    >
      <FlagSVG color={colorPick(markerType)} />
    </button>
  );
};

export default TimeMarker;
