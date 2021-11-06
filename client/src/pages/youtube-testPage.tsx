import React from 'react';

import YouTube from '../components/youtube';

const YouTubePage = (): React.ReactElement<any, any> => {
  // For example
  const user = {
    name: 'Kim',
    studentNumber: 123 // -1
  };

  return <YouTube name={user.name} studentNumber={user.studentNumber} />;
};
export default YouTubePage;
