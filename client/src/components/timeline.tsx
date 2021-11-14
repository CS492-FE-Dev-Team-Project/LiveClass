import { AlertDialogBody } from '@chakra-ui/modal';
import React from 'react';
import { flagInfo } from './youtube';

interface timeInput {
  loc: number;
}

const timeline = ({ time, message }: flagInfo) => {
  const onClickEvt = () => {
    alert(message);
  };

  console.log(time);
  return (
    <button
      className="timeline-flag"
      style={{
        left: `${time}%`
      }}
      type="button"
      aria-label="timeline"
      onClick={() => onClickEvt()}
    />
  );
};

export default timeline;
