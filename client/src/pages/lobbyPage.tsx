import React from 'react';
import { IconButton, useDisclosure, Heading } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';

import { AddIcon } from '@chakra-ui/icons';
import AddClassModal from '../components/lobbyPage/classAddModal';
import LobbyContent from '../components/lobbyPage/lobbyContent';

import classData from '../data/classData';
import ClassCard from '../components/lobbyPage/classCard';
import Header from '../components/common/Header';

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

  // -- 🐛 Call DB API to get joined classroom data --
  const instructorClassData = classData.filter(
    (elem, index) => elem.memberType === 'Instructor'
  );
  const participantClassData = classData.filter(
    (elem, index) => elem.memberType === 'Participant'
  );

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
        {instructorClassData.map(
          ({ id, imgSrc, title, subTitle, color, backgroundColor }) => (
            <ClassCard
              key={id}
              imgSrc={imgSrc}
              title={title}
              subTitle={subTitle}
              color={color}
              backgroundColor={backgroundColor}
            />
          )
        )}
      </LobbyContent>

      <br />

      <Heading size="lg" pl="30px">
        Listening lectures
      </Heading>
      <LobbyContent col={col}>
        {participantClassData.map(
          ({ id, imgSrc, title, subTitle, color, backgroundColor }) => (
            <ClassCard
              key={id}
              imgSrc={imgSrc}
              title={title}
              subTitle={subTitle}
              color={color}
              backgroundColor={backgroundColor}
            />
          )
        )}
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
      <AddClassModal onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default LobbyPage;
