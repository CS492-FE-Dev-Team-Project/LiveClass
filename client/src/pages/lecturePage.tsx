import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';
import LeftMenu from '../components/leftmenu/leftmenu';
import noticeTabSegment from '../data/leftmenuData';
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
  VideoTabEntry
} from '../types';
import { useSocket } from '../context/socket';
import { getPlayListItems } from '../components/common/playlist';

const LecturePage = () => {
  const { classUuid, memberType, lectureId } = useParams();
  const { socket, connected } = useSocket();
  const [lecture, setLecture] = useState<Lecture>();
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
          link: element.snippet.resourceId.videoId
        });
      });

      setVideoArr(videoList);

      const payload = { classUuid, lectureId };
      socket?.emit('GetActiveLectureMember', payload);
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
      }
    });
    const payload = JSON.stringify({ classUuid, lectureId: parsedLectureId });
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
  }, [connected]);

  // TODO - Take care of playlist
  // 1. Get lecture list and construct 'menus' for leftmenu
  // 2. Use lectureDate and lectureName somehow?

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
            videoIndex={0}
            videoId="j1_5ttGRzFs"
            width="100%"
            height="100%"
          />
        </Box>
        <Chat classUuid={classUuid!} lectureId={parsedLectureId} hasHeader />
      </Flex>
    </>
  );
};

export default LecturePage;
