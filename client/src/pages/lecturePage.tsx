import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';
import LeftMenu from '../components/leftmenu/leftmenu';
import menus from '../data/leftmenuData_lecture';
import YouTube from '../components/youtube';
import Chat from '../components/chat';
import FloatConnectionStatus from '../components/floatConnectionStatus';
import { MemberType, Lecture } from '../types';
import { useSocket } from '../context/socket';

const LecturePage = () => {
  const { classUuid, memberType, lectureId } = useParams();
  const { socket, connected } = useSocket();
  const [lecture, setLecture] = useState<Lecture>();

  const parsedLectureId = parseInt(lectureId!, 10);

  useEffect(() => {
    socket?.on('JoinLecture', ({ lecture: lec, status }) => {
      if (status === 404) {
        alert(
          'Error! Lecture not found in the classroom - Please restart application'
        );
      } else {
        setLecture(lec);
      }
    });
    const payload = JSON.stringify({ classUuid, lectureId: parsedLectureId });
    socket?.emit('JoinLecture', payload);
  }, [connected]);

  // useEffect(() => {
  //   console.log(lecture);
  // }, [lecture]);

  // TODO - Take care of playlist
  // 1. Get lecture list and construct 'menus' for leftmenu
  // 2. Use lectureDate and lectureName somehow?

  return (
    <>
      <FloatConnectionStatus />
      <Flex>
        <LeftMenu menus={menus} />
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
