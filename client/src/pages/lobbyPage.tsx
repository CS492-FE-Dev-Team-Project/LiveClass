import React from 'react';
import {
  Box,
  IconButton,
  useDisclosure,
  Heading,
  Image
} from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

import AddClassModal from '../components/lobbyPage/classAddModal';
import LobbyContent from '../components/lobbyPage/lobbyContent';
import ClassCard from '../components/lobbyPage/classCard';
import Header from '../components/common/Header';
import useClasses from '../hooks/useClasses';
import { MemberType } from '../types';
import AddLecturePage from '../components/lobbyPage/AddLecture';
import LogoAsset from '../assets/logo2.svg';

const LobbyPage = () => {
  const col = useBreakpointValue({
    base: '4',
    sm: '1',
    md: '2',
    lg: '3',
    xl: '4',
    '2xl': '5'
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { classes, addClass } = useClasses();

  return (
    <>
      <Header
        backgroundColor="black"
        color="gray.50"
        headingText="LiveClass"
        headingSize="lg"
        p={8}
      />
      <Box h="80px" w="100%" bgColor="black">
        <Image src={LogoAsset} alt="liveclass" h="80px" pl="8px" />
      </Box>

      <br />

      <Heading size="lg" pl="30px">
        Teaching Lectures
      </Heading>
      <LobbyContent col={col}>
        {classes
          .filter(({ memberType }) => memberType === MemberType.INSTRUCTOR)
          .map(({ uuid, title, subtitle, memberType }) => (
            <Link to={`/class/${uuid}/${memberType}`} key={uuid}>
              <ClassCard
                title={title}
                subTitle={subtitle}
                color="white"
                backgroundColor="black"
              />
            </Link>
          ))}
      </LobbyContent>

      <br />

      <Heading size="lg" pl="30px">
        Listening Lectures
      </Heading>
      <LobbyContent col={col}>
        {classes
          .filter(({ memberType }) => memberType === MemberType.STUDENT)
          .map(({ uuid, title, subtitle, memberType }) => (
            <Link to={`/class/${uuid}/${memberType}`} key={uuid}>
              <ClassCard
                imgSrc="a"
                title={title}
                subTitle={subtitle}
                color="white"
                backgroundColor="black"
              />
            </Link>
          ))}
      </LobbyContent>
      <IconButton
        position="fixed"
        right="5%"
        bottom="10%"
        size="lg"
        aria-label="Add Classroom"
        colorScheme="green"
        icon={<AddIcon />}
        onClick={onOpen}
      />
      <AddClassModal onClose={onClose} isOpen={isOpen} addClass={addClass} />
    </>
  );
};

export default LobbyPage;
