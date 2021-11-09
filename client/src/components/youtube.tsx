import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import '../style/youtube.css';

import { useSocket } from '../lib/socket';

interface userInfo {
  name: string;
  studentNumber: number;
  room: number;
}

enum VideoState {
  UNSTARTED = -1,
  ENDED,
  PLAYING,
  PAUSED,
  BUFFERING,
  CUED = 5
}

const YouTubePlayer = ({ name, studentNumber, room }: userInfo) => {
  const [video, setVideo] = useState<any>(null); // youtube player - Q. type?
  const { socket, connected } = useSocket();

  useEffect(() => {
    // For testing #ifdef DBG
    console.log(`New connection! socket id = ${socket?.id}`);

    // For testing #ifdef DBG
    // socket?.on('InstructorTimeChange', (newtime: newTime) => {
    //   console.log(`move video to new time : ${newtime}`);
    // });

    // If not instructor, sync video time
    if (studentNumber !== -1) {
      socket?.on('InstructorTimeChange', (newtime: number) => {
        video?.seekTo(newtime);
      });
      socket?.on('InstructorPlay', () => {
        video?.playVideo();
      });
      socket?.on('InstructorPause', () => {
        video?.pauseVideo();
      });
    }
    socket?.emit('JoinLecture', `{ "lectureId": ${room} }`);
  }, [connected, video]);

  const onReady = (evt: any) => {
    const player = evt.target; // has player related functions
    setVideo(player);

    // setTimeout(() => console.log(player.getCurrentTime()), 5000);
    // setInterval(() => console.log(player.getCurrentTime()), 1000);

    // evt.target.pauseVideo();
    // evt.target.playVideo();
  };

  const onStateChange = (evt: any) => {
    console.log('state change! evt : ', evt); // #ifdef DBG
    const player = evt.target;

    // When instructor changes video time : (onStateChange evt) pause-buffer-play
    // For now, detect 'buffer' as a cue of video time change
    if (evt.data === VideoState.BUFFERING) {
      const JO = JSON.stringify({
        newtime: player.getCurrentTime()
      });

      console.log('buffering!', JO); // #ifdef DBG

      socket?.emit('InstructorTimeChange', JO);
    } else if (evt.data === VideoState.PLAYING) {
      socket?.emit('InstructorPlay');
    } else if (evt.data === VideoState.PAUSED) {
      socket?.emit('InstructorPause');
    }
  };

  const options = {
    // control size
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
        onReady={onReady}
        onStateChange={onStateChange}
      />
    </div>
  );
};
export default YouTubePlayer;
