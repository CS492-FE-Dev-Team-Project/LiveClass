import React from 'react';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';

import { AddIcon } from '@chakra-ui/icons';
import AddClassModal from '../components/lobbyPage/classAddModal';
import LobbyHeader from '../components/lobbyPage/lobbyHeader';
import LobbyContent from '../components/lobbyPage/lobbyContent';

import classData from '../data/classData';
import ClassCard from '../components/lobbyPage/classCard';

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

  return (
    <>
      <LobbyHeader backgroundColor="black" color="gray.50" title="LiveClass" />
      <LobbyContent col={col}>
        {classData.map(
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
