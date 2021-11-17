import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import '../style/youtube.css';

import { useSocket } from '../lib/socket';

//
interface userInfo {
  name: string;
  studentNumber: number;
  room: number;
  videoId: string;
  width?: number | string;
  height?: number | string;
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
  videoId,
  width = 640,
  height = 360
}: userInfo) => {
  const [video, setVideo] = useState<any>(null); // youtube player - Q. type?
  const { socket, connected } = useSocket();
  const videoWrapper = useRef<HTMLDivElement>(null);

  // Cover/uncover video - for ad time or buffering
  const cover = () => videoWrapper.current?.classList.add('coverVideo');
  const uncover = () => videoWrapper.current?.classList.remove('coverVideo');
  /*
  // Usage)
  cover();
  setTimeout(() => {
    uncover();
  }, 2000);
  */

  // Set socket listeners and join room
  useEffect(() => {
    // If not instructor, sync video time, play, and pause
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
    setVideo(evt.target);
  };

  // Take care of sync logic here
  const onStateChange = (evt: any) => {
    const player = evt.target;

    const JO = JSON.stringify({
      lectureId: room,
      newtime: player.getCurrentTime()
    });

    // When instructor changes video time : (onStateChange evt) pause-buffer-play
    // For now, detect 'buffer' as a cue of video time change
    if (evt.data === VideoState.BUFFERING) {
      socket?.emit('InstructorTimeChange', JO);
    } else if (evt.data === VideoState.PLAYING) {
      // In case of changing video time while paused - update time when resume playing
      socket?.emit('InstructorTimeChange', JO);
      socket?.emit('InstructorPlay', JO);
    } else if (evt.data === VideoState.PAUSED) {
      socket?.emit('InstructorPause', JO);
    }
  };

  // Options for 'react-youtube' library component
  const options = {
    height: height.toString(),
    width: width.toString(),
    playerVars: {
      autoplay: 1 as const,
      controls: studentNumber === -1 ? (1 as const) : (0 as const),
      disablekb: studentNumber === -1 ? (0 as const) : (1 as const)
    }
  };

  // Use to set background image for video cover
  const imgURL =
    'https://previews.123rf.com/images/sevenozz/sevenozz1812/sevenozz181200056/127054720-vintage-tv-test-screen-please-stand-by-television-calibration-pattern.jpg';
  const coverStyles = {
    backgroundImage: `url(${imgURL})`,
    backgroundSize: '100% 100%'
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
          videoId={videoId}
          opts={options}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </div>
    </div>
  );
};
export default YouTubePlayer;
