import React, { useState } from 'react';
import lectureContext from './lectureContext';

const langProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [selectedVidIdx, setSelectedVidIdx] = useState<number>(0);
  const [isLive, setIsLive] = useState<boolean>(false);

  return (
    <lectureContext.Provider
      value={{ isLive, setIsLive, selectedVidIdx, setSelectedVidIdx }}
    >
      {children}
    </lectureContext.Provider>
  );
};

export default langProvider;
