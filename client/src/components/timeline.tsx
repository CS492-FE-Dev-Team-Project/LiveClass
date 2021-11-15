import React from 'react';
import { flagInfo } from './youtube'; // props type

const timeline = ({ time, message }: flagInfo) => {
  // 🐛 DO SOMETHING HERE
  const onClickEvt = () => {
    alert(message);
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
