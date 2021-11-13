import React from 'react';

import Instructor from './youtubeTestPage_instructor';
import Participant from './youtubeTestPage_participant';

const YouTubePage = (): React.ReactElement<any, any> => {
  return (
    <>
      <h1>Instructor</h1>
      <div className="App">{Instructor}</div>
      <h1>Participant</h1>
      <div className="App">{Participant}</div>
    </>
  );
};

export default <YouTubePage />;
