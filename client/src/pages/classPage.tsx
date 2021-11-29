import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import LeftMenu from '../components/leftmenu/leftmenu';
import menus from '../data/leftmenuData';
import Chat from '../components/chat';
import FloatConnectionStatus from '../components/floatConnectionStatus';
import { Lecture } from '../types';
import { useSocket } from '../context/socket';

// 🐛 나중에 lecture grid로 대체
import ClassCard from '../components/lobbyPage/classCard';

const ClassPage = () => {
  const { classUuid, memberType } = useParams();
  const { socket, connected } = useSocket();
  const [lectureList, setLectureList] = useState<Lecture[]>([]);

  useEffect(() => {
    // get all lectures in the classroom
    socket?.on('GetLectures', lectureArr => {
      setLectureList(lectureArr);
    });

    const payload = JSON.stringify({ classUuid });
    socket?.emit('GetLectures', payload);
  }, [connected]);

  const sampleLectureList = [
    { lectureId: 1 },
    { lectureId: 2 },
    { lectureId: 3 }
  ];

  // 🐛 대기 화면 - lecture grid로 대체
  const imgURL =
    'https://previews.123rf.com/images/sevenozz/sevenozz1812/sevenozz181200056/127054720-vintage-tv-test-screen-please-stand-by-television-calibration-pattern.jpg';
  const coverStyles = {
    backgroundImage: `url(${imgURL})`,
    backgroundSize: '100% 100%'
  };

  return (
    <>
      <FloatConnectionStatus />
      <Flex>
        <LeftMenu menus={menus} />
        <Box w="8px" h="100vh" />
        <Box w="100%" h="100vh" style={coverStyles}>
          {/* 상현님이 구현해주실 classPage lecture grid 이곳에 - Issue #99 */}
          {
            /* 🐛 lectureList로 바꾸기 */ sampleLectureList.map(
              ({ lectureId }) => (
                <Link
                  to={`/class/${classUuid}/${memberType}/${lectureId}`}
                  key={lectureId}
                >
                  <ClassCard
                    title={`Lecture${lectureId}`}
                    subTitle={`Test${lectureId}`}
                    color="white"
                    backgroundColor="black"
                  />
                </Link>
              )
            )
          }
        </Box>
        <Chat room={uuid} hasHeader />
      </Flex>
    </>
  );
};

export default ClassPage;
