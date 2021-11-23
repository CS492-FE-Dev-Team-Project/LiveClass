import React from 'react';
import { IconButton, useDisclosure, Heading } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { AddIcon } from '@chakra-ui/icons';

import AddClassModal from '../components/lobbyPage/classAddModal';
import LobbyContent from '../components/lobbyPage/lobbyContent';
import ClassCard from '../components/lobbyPage/classCard';
import Header from '../components/common/Header';
import useClasses from '../hooks/useClasses';
import { MemberType } from '../types';

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

      <br />

      <Heading size="lg" pl="30px">
        Teaching lectures
      </Heading>
      <LobbyContent col={col}>
        {classes
          .filter(({ memberType }) => memberType === MemberType.INSTRUCTOR)
          .map(({ uuid, title, subtitle }) => (
            <ClassCard
              key={uuid}
              imgSrc="imgSrc"
              title={title}
              subTitle={subtitle}
              color="black"
              backgroundColor="white"
            />
          ))}
      </LobbyContent>

      <br />

      <Heading size="lg" pl="30px">
        Listening lectures
      </Heading>
      <LobbyContent col={col}>
        {classes
          .filter(({ memberType }) => memberType === MemberType.STUDENT)
          .map(({ uuid, title, subtitle }) => (
            <ClassCard
              key={uuid}
              imgSrc="imgSrc"
              title={title}
              subTitle={subtitle}
              color="black"
              backgroundColor="white"
            />
          ))}
      </LobbyContent>
      <IconButton
        position="fixed"
        right="100px"
        bottom="100px"
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
