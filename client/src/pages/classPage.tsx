import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';
import LeftMenu from '../components/leftmenu/leftmenu';
import menus from '../data/leftmenuData';
import YouTube from '../components/youtube';
import Chat from '../components/chat';

const ClassPage = () => {
  const { uuid } = useParams();

  const classData = {
    name: 'CS330'
  };

  const user = {
    name: 'Kim',
    studentNumber: -1, // -1
    room: 10
  };

  return (
    <>
      <Flex>
        <LeftMenu classname={classData.name} menus={menus} />
        <Box w="100%" h="100vh">
          <YouTube
            name={user.name}
            studentNumber={user.studentNumber}
            room={user.room}
            videoId="j1_5ttGRzFs"
            width="100%"
            height="100%"
          />
        </Box>
        <Chat header="Chat" hasHeader />
      </Flex>
    </>
  );
};

export default ClassPage;
