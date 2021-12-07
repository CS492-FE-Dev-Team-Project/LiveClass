import React, { useState, useEffect, useRef, useContext } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { type } from 'os';
import LeftMenu from '../components/leftmenu/leftmenu';
import defaultNoticeTabEntries from '../data/leftmenuData';
import YouTube from '../components/youtube';
import Chat from '../components/chat';
import FloatConnectionStatus from '../components/floatConnectionStatus';
import {
  MemberType,
  Lecture,
  Member,
  TabSegment,
  TabType,
  UserTabEntry,
  VideoTabEntry,
  NoticeTabEntry
} from '../types';
import { useSocket } from '../context/socket';
import { getPlayListItems } from '../components/common/playlist';
import LectureContext from '../context/lecture/lectureContext';

const LecturePage = () => {
  const { classUuid, memberType, lectureId } = useParams();
  const { socket, connected } = useSocket();
  const [lecture, setLecture] = useState<Lecture>();
  const { isLive, setIsLive, selectedVidIdx, setSelectedVidIdx } =
    useContext(LectureContext);

  const EMPTY_HANDLER = () => {
    // Do nothing
  };

  const [videoArr, setVideoArr] = useState<VideoTabEntry[]>([]);
  const videoTabSegment: TabSegment = {
    tabTitle: 'Playlist',
    tabContents: videoArr
  };
  const [memberArr, setMemberArr] = useState<UserTabEntry[]>([]);
  const memberTabSegment: TabSegment = {
    tabTitle: 'Participants',
    tabContents: memberArr
  };

  const [noticeArr, setNoticeArr] = useState<NoticeTabEntry[]>(
    defaultNoticeTabEntries
  );
  const noticeTabSegment: TabSegment = {
    tabTitle: 'Lecture room',
    tabContents: noticeArr
  };

  useEffect(() => {
    if (memberType === MemberType.INSTRUCTOR) {
      const payload = JSON.stringify({
        classUuid,
        lectureId: parsedLectureId,
        status: !isLive
      });
      const toggleLiveButton: NoticeTabEntry = {
        tabName: `${isLive ? '⚫ Off' : '🔴 Go'} Live`,
        type: TabType.NOTICE,
        message: 'toggleLive',
        onClickHandler: () => {
          socket?.emit('SetLectureLiveStatus', payload);
        }
      };
      setNoticeArr([...defaultNoticeTabEntries, toggleLiveButton]);
    } else {
      const notifyLiveButton: NoticeTabEntry = {
        tabName: isLive ? '🔴 On-Live' : '⚫ Off-Live',
        type: TabType.NOTICE,
        message: 'notifyLive',
        onClickHandler: EMPTY_HANDLER
      };
      setNoticeArr([...defaultNoticeTabEntries, notifyLiveButton]);
    }
  }, [isLive]);

  const parsedLectureId = parseInt(lectureId!, 10);

  useEffect(() => {
    if (!lecture) return;

    const videoList: VideoTabEntry[] = [];
    getPlayListItems(lecture.playlist).then(data => {
      data.items.forEach((element: any, idx: number) => {
        videoList.push({
          tabName: element.snippet.title,
          type: TabType.VIDEO,
          videoIdx: idx,
          link: element.snippet.resourceId.videoId,
          onClickHandler: () => {
            // only the instructor gets to choose video on LIVE
            socket?.emit('SelectVideo', {
              classUuid,
              lectureId: parsedLectureId,
              selectedVideoIdx: idx
            });
          }
        });
      });

      setVideoArr(videoList);
    });
  }, [lecture]);

  // Get videos in the playlist & participants in the lecture
  useEffect(() => {
    socket?.on('JoinLecture', ({ user, lecture: lec, status }) => {
      if (status === 200) {
        setLecture(lec);

        const newUser: UserTabEntry = {
          tabName: user.userName,
          type: TabType.USER,
          userId: user.id
        };

        setMemberArr(arr => [...arr, newUser]);
        const payload = { classUuid, lectureId: parsedLectureId };
        socket?.emit('GetActiveLectureMember', payload);
      }
    });
    const payload = { classUuid, lectureId: parsedLectureId };
    socket?.emit('JoinLecture', payload);

    // get members participating in the lecture
    socket?.on('GetActiveLectureMember', response => {
      const { members, status } = response;
      if (status === 200) {
        const newMemList = members.map(
          (mem: Member): UserTabEntry => ({
            tabName: mem.userName,
            type: TabType.USER,
            userId: mem.id
          })
        );
        setMemberArr(newMemList);
      }
    });

    // lecture live status change
    socket?.on('SetLectureLiveStatus', response => {
      const { liveStatus, status } = response;
      if (status === 200) {
        setIsLive(liveStatus);
      }
    });

    // instructor selected video among playlist
    socket?.on('SelectVideo', response => {
      const { selectedVideoIdx, status } = response;
      if (status === 200) {
        setSelectedVidIdx(selectedVideoIdx);
      }
    });
  }, [connected]);

  // TODO - Take care of playlist
  // 1. Get lecture list and construct 'menus' for leftmenu
  // 2. Use lectureDate and lectureName somehow?

  console.log(isLive, memberType, isLive && memberType === MemberType.STUDENT);

  return (
    <>
      <FloatConnectionStatus />
      <Flex>
        <LeftMenu
          menus={[noticeTabSegment, videoTabSegment, memberTabSegment]}
        />
        <Box w="8px" h="100vh" />
        <Box w="100%" h="100vh">
          <YouTube
            memberType={(memberType ?? MemberType.STUDENT) as MemberType}
            classUuid={classUuid ?? 'uuid error'}
            lectureId={parsedLectureId}
            videoIndex={selectedVidIdx}
            videoId={
              videoArr.length > 0 ? videoArr[selectedVidIdx].link : 'NULL'
            }
            width="100%"
            height="100%"
            isControled={memberType === MemberType.STUDENT && isLive}
          />
        </Box>
        <Chat classUuid={classUuid!} lectureId={parsedLectureId} hasHeader />
      </Flex>
    </>
  );
};

export default LecturePage;
