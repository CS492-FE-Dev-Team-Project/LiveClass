import React from 'react';
import {
  Box,
  ChakraProvider,
  Heading,
  Grid,
  IconButton
} from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';

import { AddIcon } from '@chakra-ui/icons';
import ClassCard from '../components/classCard';

const LobbyHeader = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <Box width="full" p={8} backgroundColor="green.400">
      {children}
    </Box>
  );
};

const LobbyPage = () => {
  const numCol = useBreakpointValue({
    base: '4',
    sm: '1',
    md: '2',
    lg: '3',
    xl: '4',
    '2xl': '5'
  });

  return (
    <>
      <LobbyHeader>
        <Heading color="gray.50">LiveClass</Heading>
      </LobbyHeader>
      <Grid templateColumns={`repeat(${numCol ?? 4}, 1fr)`} p={5} gap={8}>
        <ClassCard src="https://bit.ly/2Z4KKcF" text="CS330" />
        <ClassCard src="https://bit.ly/2Z4KKcF" text="CS330" />
        <ClassCard src="https://bit.ly/2Z4KKcF" text="CS330" />
        <ClassCard src="https://bit.ly/2Z4KKcF" text="CS330" />
        <ClassCard src="https://bit.ly/2Z4KKcF" text="CS330" />
        <ClassCard src="https://bit.ly/2Z4KKcF" text="CS330" />
      </Grid>
      <IconButton
        position="fixed"
        right="100px"
        bottom="100px"
        size="lg"
        aria-label="Add Classroom"
        colorScheme="green"
        icon={<AddIcon />}
      />
    </>
  );
};

export default LobbyPage;
