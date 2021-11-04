import React from 'react';
import {
  Box,
  ChakraProvider,
  Heading,
  Image,
  Grid,
  IconButton
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

const LobbyHeader = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <Box width="full" p={3} backgroundColor="green.400">
      {children}
    </Box>
  );
};

const ClassCard = ({ src, text }: { src: string; text: string }) => {
  return (
    <Box
      maxW="sm"
      maxH={300}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      _hover={{ cursor: 'pointer', boxShadow: '0 0 1px rgba(0,0,0,1)' }}
    >
      <Image src={src} alt="Sample Image" />

      <Box
        p={4}
        w="full"
        h="40%"
        position="absolute"
        bottom={0}
        borderWidth="1px"
        backgroundColor="gray.50"
        color="green.600"
      >
        <Box pl={3} fontSize={30} fontWeight="bold">
          {text}
        </Box>
      </Box>
    </Box>
  );
};

const LobbyPage = () => {
  return (
    <ChakraProvider>
      <LobbyHeader>
        <Heading color="gray.50">LiveClass</Heading>
      </LobbyHeader>
      <Grid templateColumns="repeat(4, 1fr)" p={5} gap={8}>
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
    </ChakraProvider>
  );
};

export default LobbyPage;
