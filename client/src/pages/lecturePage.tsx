import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';
import LeftMenu from '../components/leftmenu/leftmenu';
import menus from '../data/leftmenuData';
import YouTube from '../components/youtube';
import Chat from '../components/chat';
import FloatConnectionStatus from '../components/floatConnectionStatus';
import useMe from '../hooks/useMe';
import { MemberType } from '../types';

const ClassPage = () => {
  const { userName } = useMe();
  const { classUuid, memberType, lectureId } = useParams();

  return (
    <>
      <FloatConnectionStatus />
      <Flex>
        <LeftMenu menus={menus} />
        <Box w="8px" h="100vh" />
        <Box w="100%" h="100vh">
          <YouTube
            userName={userName}
            memberType={(memberType ?? MemberType.STUDENT) as MemberType}
            room={classUuid ?? 'uuid error'}
            videoId="j1_5ttGRzFs"
            width="100%"
            height="100%"
          />
        </Box>
        <Chat hasHeader />
      </Flex>
    </>
  );
};

export default ClassPage;
