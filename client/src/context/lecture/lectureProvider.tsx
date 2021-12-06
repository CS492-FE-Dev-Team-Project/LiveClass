import React, { useState } from 'react';
import lectureContext from './lectureContext';

const langProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [selectedVidIdx, setSelectedVidIdx] = useState<number>(0);

  return (
    <lectureContext.Provider value={{ selectedVidIdx, setSelectedVidIdx }}>
      {children}
    </lectureContext.Provider>
  );
};

export default langProvider;
