import React from 'react';
import { Box, IconButton, Flex } from '@chakra-ui/react';
import { ChevronRightIcon, TimeIcon } from '@chakra-ui/icons';
import LeftMenu from '../components/leftmenu/leftmenu';
import menus from '../data/leftmenuData';
import YouTube from '../components/youtube';
import Chat from '../components/chat';

const ClassPage = () => {
  const user = {
    name: 'Kim',
    studentNumber: -1, // -1
    room: 10
  };

  const screenHeight = window.innerHeight - 1;

  return (
    <>
      <Flex>
        <LeftMenu menus={menus} />
        <Box w="10px" h="100vh" />
        <Box w="100%" h="100vh">
          <YouTube
            name={user.name}
            studentNumber={user.studentNumber}
            room={user.room}
            videoId="j1_5ttGRzFs"
            width="100%"
            height={screenHeight}
          />
        </Box>
        <Chat header="Chat" hasHeader />
      </Flex>
    </>
  );
};

export default ClassPage;
