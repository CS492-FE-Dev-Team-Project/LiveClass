import React from 'react';
import {
  VStack,
  Stack,
  StackDivider,
  Text,
  Button,
  Box,
  Heading
} from '@chakra-ui/react';

const LeftMenuItem = ({ text }: any) => {
  return <span>{text}</span>;
};

const LeftMenu = ({ classData, lectures }: any) => {
  return (
    <Box minH="100vh" maxW="150px" bg="gray.200">
      <VStack
        divider={<StackDivider borderColor="gray" />}
        spacing={3}
        align="stretch"
      >
        <Box className="className">
          <Stack spacing={0}>
            <Heading as="h1" size="md">
              {classData.name}
            </Heading>
            <Button colorScheme="teal" variant="ghost">
              Notice
            </Button>
            <Button colorScheme="teal" variant="ghost">
              Materials
            </Button>
          </Stack>
        </Box>
        <Box className="lectures">
          <Stack spacing={0}>
            <Heading as="h1" size="md">
              Lectures
            </Heading>
            {lectures.map((lecture: any) => (
              <Button colorScheme="teal" variant="ghost">
                {lecture.date}
              </Button>
            ))}
          </Stack>
        </Box>
        <Box className="classmates">
          <Stack spacing={0}>
            <Heading as="h1" size="md">
              Classmates
            </Heading>
          </Stack>
        </Box>
      </VStack>
    </Box>
  );
};

export default LeftMenu;
