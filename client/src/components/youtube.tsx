import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import '../style/youtube.css';

import { Progress } from '@chakra-ui/react';
import { CreateMarkerButtons } from './common/Button';
import { useSocket } from '../context/socket';
import TimeMarker from './timeMarker';
import { Marker, MarkerType, MemberType } from '../types';

interface userInfo {
  memberType: MemberType;
  classUuid: string;
  lectureId: number;
  videoId: string;
  videoIndex: number;
  width?: number | string; // 100px or '65%'
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
  memberType,
  classUuid,
  lectureId,
  videoId,
  videoIndex,
  width = '100%',
  height = '100%',
  isControled
}: userInfo & { isControled?: boolean }) => {
  const { socket, connected } = useSocket();
  const [video, setVideo] = useState<any>(null); // youtube player - Q. type?

  const [videoCurrent, setVideoCurrent] = useState<number>(0); // current running time of the video
  const videoDuration = useRef<number>(0); // total video length
  const intervalID = useRef<NodeJS.Timeout | null>(null); // setInterval return value for tracking current running time

  // DOM ref
  const videoWrapper = useRef<HTMLDivElement>(null);
  const videoTimelineWrapper = useRef<HTMLDivElement>(null);

  // -- 🐛 Mockup data--
  const [markers, setMarkers] = useState<Marker[]>([]); // get real 'markerInfoArr' data by calling DB API 🐛

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
    if (connected && !!video) {
      if (isControled) {
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

      socket?.emit('GetMarkers', { classUuid, lectureId });
      socket?.on('GetMarkers', ({ markers: responseMarkers, status }) => {
        if (status === 200) {
          setMarkers(responseMarkers);
        }
      });
    }

    return () => {
      clearInterval(intervalID.current as NodeJS.Timeout);
      socket?.off('InstructorTimeChange');
      socket?.off('InstructorPlay');
      socket?.off('InstructorPause');
      socket?.off('GetMarkers');
    };
  }, [connected, video]);

  if (isControled) videoWrapper.current?.classList.add('live');
  else videoWrapper.current?.classList.remove('live');

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
    if (isControled) return;

    const player = evt.target;

    const JO = JSON.stringify({
      classUuid,
      lectureId,
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

  const createTimeMarker = (markerType: MarkerType) => {
    const payload = {
      classUuid,
      lectureId,
      marker: { markerType, time: video.getCurrentTime(), videoIndex }
    };
    console.log(payload, video);
    socket?.emit('CreateMarker', JSON.stringify(payload));
    socket?.on('CreateMarker', ({ marker, status }) => {
      if (status === 200) {
        setMarkers(markerArr => [...markerArr, marker]);
      }
    });
  };

  // Options for 'react-youtube' library component
  const options = {
    height: height.toString(),
    width: width.toString(),
    playerVars: {
      autoplay: 0 as const,
      controls: isControled ? (0 as const) : (1 as const),
      disablekb: isControled ? (1 as const) : (0 as const),
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
      className={memberType === MemberType.INSTRUCTOR ? 'teacher' : 'student'}
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
      <CreateMarkerButtons onClick={createTimeMarker} />
      {/* 3 Overlay components on top of video player - timeline marker, create marker buttons, and progress bar */}
      <div className="video-timeline-components" ref={videoTimelineWrapper}>
        {markers.map(({ id, markerType, time }) => {
          if (videoDuration.current === 0) return <div />;

          // edge cases for time - outside [0, videoDuration]
          const currentTime =
            time > videoDuration.current ? videoDuration.current - 5 : time;

          return (
            <TimeMarker
              id={id}
              time={(currentTime / videoDuration.current) * 100}
              markerType={markerType}
              videoIndex={videoIndex}
            />
          );
        })}
        {isControled ? (
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
