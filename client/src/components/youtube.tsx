import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import '../style/youtube.css';

import { Socket } from 'socket.io-client';

interface userInfo {
  name: string;
  studentNumber: number;
  socket: Socket | null;
}

interface newTime {
  newtime: number;
}

// TS enum has error regarding eslint 'no-shadow' - 'typescript enum already declared in the upper scope'
// enum VideoState {
const VideoState = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5
};

const YouTubePlayer = ({ name, studentNumber, socket }: userInfo) => {
  const [video, setVideo] = useState<any>(null); // youtube player - type?

  // get socket by props
  useEffect(() => {
    setInterval(() => console.log(socket?.id), 1000);

    // For testing #ifdef DBG
    console.log(`New connection! socket id = ${socket?.id}`);

    // For testing #ifdef DBG
    socket?.on('InstructorTimeChange', (newtime: newTime) => {
      console.log(`move video to new time : ${newtime}`);
    });

    // if (video != null && studentNumber !== -1) {
    //   // If not instructor, sync video time
    //   socket?.on('InstructorTimeChange', (newtime: newTime) => {
    //     video?.seekTo(newtime);
    //   });
    // }
  }, []);

  const onReady = (evt: any) => {
    const player = evt.target; // has player related functions
    setVideo(player);

    // setTimeout(() => console.log(player.getCurrentTime()), 5000);
    // setInterval(() => console.log(player.getCurrentTime()), 1000);

    // evt.target.pauseVideo();
    // evt.target.playVideo();
  };

  const onStateChange = (evt: any) => {
    console.log('state change! evt : ', evt);
    const player = evt.target;

    if (evt.data === VideoState.BUFFERING) {
      const JO = JSON.stringify({
        newtime: player.getCurrentTime()
      });

      console.log('buffering!', JO);

      socket?.emit('InstructorTimeChange', JO);
    }
  };

  const options = {
    // control size
    // height: '390',
    // width: '640',

    playerVars: {
      autoplay: 0 as const,
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
        onStateChange={onStateChange}
      />
    </div>
  );
};
export default YouTubePlayer;
