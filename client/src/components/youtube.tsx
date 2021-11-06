import React from 'react';
import YouTube from 'react-youtube';
import '../style/youtube.css';

interface userInfo {
  name: string;
  studentNumber: number;
}

const YouTubePlayer = ({ name, studentNumber }: userInfo) => {
  const onReady = (evt: any) => {
    console.log(evt.target);
    // evt.target.pauseVideo();
    // evt.target.playVideo();
  };

  const options = {
    // height: '390',
    // width: '640',
    playerVars: {
      autoplay: 1 as const,
      controls: studentNumber === -1 ? (1 as const) : (0 as const),
      disablekb: studentNumber === -1 ? (0 as const) : (1 as const)
    }
  };

  return (
    <div
      className={studentNumber === -1 ? 'teacher' : 'student'}
      id="youtube-wrapper"
    >
      <YouTube
        videoId="dvgZkm1xWPE"
        opts={options}
        // opts={{ playerVars: { autoplay: 1, controls: 0, disablekb: 1 } }}
        onReady={onReady}
      />
    </div>
  );
};
export default YouTubePlayer;
