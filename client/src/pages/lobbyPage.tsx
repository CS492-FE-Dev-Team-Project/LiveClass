import React, { useEffect, useContext, useState } from 'react';
import { IconButton, useDisclosure, Heading } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';

import { AddIcon } from '@chakra-ui/icons';
import AddClassModal from '../components/lobbyPage/classAddModal';
import LobbyContent from '../components/lobbyPage/lobbyContent';

import classData from '../data/classData';
import ClassCard from '../components/lobbyPage/classCard';
import Header from '../components/common/Header';
import UserContext from '../context/user/userContext';
import { UserLoadStatus } from '../context/user/userProvider';
import useClasses from '../hooks/useClasses';

export interface Class {
  uuid: string;
  title: string;
  subtitle: string;
  memberType: MemberType;
}

enum MemberType {
  INSTRUCTOR = 'instructor',
  STUDENT = 'student'
}

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
        onClick={() => {
          fetch('http://localhost:5000/api/lobby/class', {
            method: 'PATCH',
            body: JSON.stringify({
              uuid: 'c34c8b0c-9826-4405-9cc8-52ea2e2fedba'
            }),
            headers: { 'Content-Type': 'application/json' }
          })
            .then(r => r.json())
            .then(j => {
              addClass(j.class);
            })
            .catch(e => console.error(e));
        }}
      />
      <AddClassModal onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default LobbyPage;
