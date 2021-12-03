import React, { useState, useEffect } from 'react';
import { Box, Flex, Button, useClipboard, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import LeftMenu from '../components/leftmenu/leftmenu';
import menus from '../data/leftmenuData_class';
import Chat from '../components/chat';
import FloatConnectionStatus from '../components/floatConnectionStatus';
import { Lecture, Member } from '../types';
import { useSocket } from '../context/socket';
import { ClipboardButton } from '../components/common/Button';
// 🐛 나중에 lecture grid로 대체
import ClassCard from '../components/lobbyPage/classCard';

const ClassPage = () => {
  const { classUuid, memberType } = useParams();
  const { socket, connected } = useSocket();
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [lectureList, setLectureList] = useState<Lecture[]>([]);

  const { hasCopied, onCopy } = useClipboard(classUuid!);
  const toast = useToast();

  useEffect(() => {
    const payload = JSON.stringify({ classUuid });

    socket?.on('JoinClass', () => {
      socket?.emit('GetClassMembers', payload);
      socket?.emit('GetLectures', payload);
    });
    socket?.emit('JoinClass', payload);

    // get all members and lectures in the classroom
    socket?.on('GetClassMembers', memberArr => {
      setMemberList(memberArr);
    });
    socket?.on('GetLectures', response => {
      const { lectures, status } = response;
      if (status === 200) {
        setLectureList(lectures);
      }
    });
  }, [connected]);

  const clickClipboard = () => {
    onCopy();
    toast({
      title: 'ClassId copied to your clipboard!',
      status: 'success',
      duration: 1500,
      isClosable: true
    });
  };

  const sampleLectureList = [
    { lectureId: 1 },
    { lectureId: 2 },
    { lectureId: 3 }
  ];

  const content =
    connected &&
    lectureList.length &&
    lectureList.map(
      ({ id: lectureId, lectureDate, lectureName, LiveStatus }) => (
        <Link
          to={`/class/${classUuid}/${memberType}/${lectureId}`}
          key={lectureId}
        >
          <ClassCard
            title={`${lectureName}#${lectureId}`}
            subTitle={`${LiveStatus ? 'LIVE' : 'NotLive'}-${lectureDate}`}
            color="white"
            backgroundColor="black"
          />
        </Link>
      )
    );

  return (
    <>
      <FloatConnectionStatus />
      <Flex>
        <LeftMenu menus={menus} />
        <Box w="8px" h="100vh" />
        <Box w="100%" h="100vh">
          {/* 상현님이 구현해주실 classPage lecture grid 이곳에 - Issue #99 */}
          {content}
          <Link to={`/class/${classUuid}/${memberType}/createLecture`}>
            <Button>Create new lecture</Button>
          </Link>
          <ClipboardButton onClick={clickClipboard}>
            Copy Class Id
          </ClipboardButton>
        </Box>
        {/* <Chat classUuid={classUuid!} hasHeader /> */}
      </Flex>
    </>
  );
};

export default ClassPage;
