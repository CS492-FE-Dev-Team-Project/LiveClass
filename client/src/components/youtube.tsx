import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import '../style/youtube.css';

import { Progress } from '@chakra-ui/react';
import { useSocket } from '../context/socket';

import Flag from './timeline';
//
interface userInfo {
  name: string;
  studentNumber: number;
  room: number;
  videoId: string;
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

export interface flagInfo {
  time: number;
  message: string;
}

const YouTubePlayer = ({
  name,
  studentNumber,
  room,
  videoId,
  width = 640,
  height = 360
}: userInfo) => {
  const { socket, connected } = useSocket();
  const [video, setVideo] = useState<any>(null); // youtube player - Q. type?

  const [videoCurrent, setVideoCurrent] = useState<number>(0);
  const videoDuration = useRef<number>(0);
  const intervalID = useRef<NodeJS.Timeout | null>(null);

  // DOM ref
  const videoWrapper = useRef<HTMLDivElement>(null);
  const videoTimelineWrapper = useRef<HTMLDivElement>(null);

  // -- 🐛 Mockup data--
  const [flagInfoArr, setFlagInfoArr] = useState<Array<flagInfo>>([
    { time: 30, message: 'A' },
    { time: 50, message: 'B' },
    { time: -1, message: 'C' },
    { time: 100, message: 'D' }
  ]); // get real 'flagInfoArr' data by calling DB API 🐛

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

  // Initialize
  const onReady = (evt: any) => {
    setVideo(evt.target);
    videoDuration.current = evt.target.playerInfo.duration;
  };

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

  // (For progress bar time) Set new setInterval on play
  const onPlay = (evt: any) => {
    intervalID.current = setInterval(() => {
      setVideoCurrent(video.getCurrentTime());
    }, 100);
  };
  // (For progress bar time) Remove setInterval on pause
  const onPause = (evt: any) => {
    clearInterval(intervalID.current as NodeJS.Timeout);
  };

  // Take care of sync logic here
  const onStateChange = (evt: any) => {
    if (studentNumber !== -1) return;

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
      disablekb: studentNumber === -1 ? (0 as const) : (1 as const),
      rel: 0 as const
    }
  };

  // (Optional - default : black backgroun) Use to set background image for video cover
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
      onMouseEnter={() => {
        videoTimelineWrapper.current?.classList.add('showTimeline');
      }}
      onMouseLeave={() => {
        videoTimelineWrapper.current?.classList.remove('showTimeline');
      }}
    >
      {/* Overlay components on top of video player - timeline component and progress bar */}
      <div className="video-timeline-components" ref={videoTimelineWrapper}>
        {flagInfoArr.map((info, idx) => {
          if (videoDuration.current === 0) return <div />;

          // edge cases for time - outside [0, videoDuration]
          let { time } = info;
          if (info.time > videoDuration.current)
            time = videoDuration.current - 5;
          else if (info.time < 0) time = 0;

          return (
            <Flag
              time={(time / videoDuration.current) * 100}
              message={info.message}
            />
          );
        })}
        {studentNumber !== -1 ? (
          <Progress
            colorScheme="red"
            position="absolute"
            bottom="5px"
            height="5px"
            width="100%"
            value={
              videoDuration.current
                ? (videoCurrent / videoDuration.current) * 100
                : 0
            }
          />
        ) : (
          <div /> /* Empty */
        )}
      </div>
      <div className="video-cover" style={coverStyles} />
      <div className="video-container">
        <YouTube
          className="video"
          videoId={videoId}
          opts={options}
          onReady={onReady}
          onPlay={onPlay}
          onPause={onPause}
          onStateChange={onStateChange}
        />
      </div>
    </div>
  );
};
export default YouTubePlayer;
