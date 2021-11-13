import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import '../style/youtube.css';

import { url } from 'inspector';
import { EnumNumberBody } from '@babel/types';
import { useSocket } from '../lib/socket';

//
interface userInfo {
  name: string;
  studentNumber: number;
  room: number;
  width?: number;
  height?: number;
}

enum VideoState {
  UNSTARTED = -1,
  ENDED,
  PLAYING,
  PAUSED,
  BUFFERING,
  CUED = 5
}

const YouTubePlayer = ({
  name,
  studentNumber,
  room,
  width = 640,
  height = 360
}: userInfo) => {
  const [video, setVideo] = useState<any>(null); // youtube player - Q. type?
  const { socket, connected } = useSocket();
  const videoWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // For testing #ifdef DBG
    console.log(`New connection! socket id = ${socket?.id}`);

    // For testing #ifdef DBG
    // socket?.on('InstructorTimeChange', (newtime: newTime) => {
    //   console.log(`move video to new time : ${newtime}`);
    // });

    // Set size
    // if (videoWrapper.current) {
    //   console.log(videoWrapper.current.style.width);
    //   videoWrapper.current.style.width = width.toString();
    //   videoWrapper.current.style.height = height.toString();
    //   console.log(videoWrapper.current.style.width);
    //   // not working
    // }
    // console.log(width, height);
    video?.setSize(width, height);

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
      // In case of changing video time while paused - update time when resume playing
      const JO = JSON.stringify({
        newtime: player.getCurrentTime()
      });
      socket?.emit('InstructorTimeChange', JO);
      socket?.emit('InstructorPlay');
    } else if (evt.data === VideoState.PAUSED) {
      socket?.emit('InstructorPause');

      // Test - video cover
      videoWrapper.current?.classList.add('coverVideo');
      setTimeout(() => {
        videoWrapper.current?.classList.remove('coverVideo');
      }, 1000);
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

  // Use to set background image for video cover
  const imgURL =
    'https://hips.hearstapps.com/countryliving.cdnds.net/17/47/1511194376-cavachon-puppy-christmas.jpg';
  const coverStyles = {
    // backgroundImage: `url(${imgURL})`
    // backgroundColor: 'black'
  };

  return (
    <div
      className={studentNumber === -1 ? 'teacher' : 'student'}
      id="youtube-wrapper"
      ref={videoWrapper}
      style={{
        width,
        height
      }}
    >
      <div className="video-cover" style={coverStyles} />
      <div className="video-container">
        <YouTube
          videoId="j1_5ttGRzFs"
          opts={options}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </div>
    </div>
  );
};
export default YouTubePlayer;
