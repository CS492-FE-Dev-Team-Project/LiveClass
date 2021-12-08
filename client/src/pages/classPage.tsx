import React, { useState, useEffect } from 'react';
import { Box, Flex, Button, useClipboard, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import LeftMenu from '../components/leftmenu/leftmenu';
import defaultNoticeTabEntries from '../data/leftmenuData';
import Chat from '../components/chat';
import FloatConnectionStatus from '../components/floatConnectionStatus';
import {
  Lecture,
  Member,
  MemberType,
  MenuContext,
  TabSegment,
  TabType,
  UserTabEntry
} from '../types';
import { useSocket } from '../context/socket';
import { ClipboardButton } from '../components/common/Button';
// 🐛 나중에 lecture grid로 대체
import LectureCarousel from '../components/lecturecarousel/lecturecarousel';

const ClassPage = () => {
  const { classUuid, memberType } = useParams();
  const { socket, connected } = useSocket();
  const [lectureList, setLectureList] = useState<Lecture[]>([]);

  const { hasCopied, onCopy } = useClipboard(classUuid!);
  const toast = useToast();

  const memberTypeEntry = {
    tabName:
      memberType === MemberType.INSTRUCTOR ? 'Instructor 👨‍🏫' : 'Student 👨‍🎓',
    type: TabType.NOTICE,
    message: 'Member Type'
  };

  const noticeTabSegment: TabSegment = {
    tabTitle: 'Classroom',
    tabContents: [...defaultNoticeTabEntries, memberTypeEntry]
  };

  const [memberArr, setMemberArr] = useState<UserTabEntry[]>([]);
  const memberTabSegment: TabSegment = {
    tabTitle: 'Classmates',
    tabContents: memberArr
  };

  useEffect(() => {
    const payload = JSON.stringify({ classUuid });

    // Initialize
    socket?.on('JoinClass', () => {
      socket?.emit('GetClassMembers', payload);
      socket?.emit('GetLectures', payload);
    });
    socket?.emit('JoinClass', payload);

    // Whenever new lecture is created - update lecture list
    socket?.on('CreateLecture', response => {
      const { lecture, status } = response;
      if (status === 200) {
        // socket?.emit('GetLectures', payload);
        setLectureList(lecList => [...lecList, lecture]);
      }
    });

    // get all members and lectures in the classroom
    socket?.on('GetClassMembers', response => {
      const { members, status } = response;
      if (status === 200) {
        // Formulate tabEntries for members
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
  return (
    <>
      <FloatConnectionStatus />
      <Flex>
        <LeftMenu
          menus={[noticeTabSegment, memberTabSegment]}
          memuContext={MenuContext.Class}
        />
        <Box w="8px" h="100vh" />
        <Box w="100%" h="100vh" bgColor="gray.100">
          <LectureCarousel
            classUuid={classUuid}
            memberType={memberType}
            lectureList={lectureList}
          />
          {memberType === 'instructor' && (
            <Link to={`/class/${classUuid}/${memberType}/createLecture`}>
              <Button>Create new lecture</Button>
            </Link>
          )}
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
