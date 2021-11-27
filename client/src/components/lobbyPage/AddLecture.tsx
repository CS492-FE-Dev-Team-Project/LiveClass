import React from 'react';
import { IconButton, useDisclosure, Heading } from '@chakra-ui/react';
import {
  Box,
  Input,
  InputGroup,
  Button,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption
} from '@chakra-ui/react';
import { Center, Square, Circle } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import CreateQuiz from '../quiz/createquiz';

const AddLecturePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenremove,
    onOpen: onOpenremove,
    onClose: onCloseremove
  } = useDisclosure();
  const [Lecturetitle, setLecturetitle] = React.useState('');
  const [Lecturemonth, setLecturemonth] = React.useState('');
  const [Lectureday, setLectureday] = React.useState('');
  const [Lecturehour, setLecturehour] = React.useState('');
  const [Lecturemin, setLecturemin] = React.useState('');
  const [Lecturenotice, setLecturenotice] = React.useState('');
  const [Lecturelink, setLecturelink] = React.useState('');
  const [Lecturequiztime, setLecturequiztime] = React.useState('');
  const [Lectureproblem, setLectureproblem] = React.useState('');
  const [Lectureanswer, setLectureanswer] = React.useState('');
  const [Removenumber, setRemovenumber] = React.useState('');
  const [Lecturequizlist, setLecturequizlist] = React.useState([
    {
      id: 0,
      link: 'Lecturelink',
      quiztime: 'Lecturequiztime',
      problem: 'Lectureproblem',
      answer: 'Lectureanswer'
    }
  ]);
  const onChangeLecturequiz = () => {
    const newquiz = {
      id: Lecturequizlist.length,
      link: Lecturelink,
      quiztime: Lecturequiztime,
      problem: Lectureproblem,
      answer: Lectureanswer
    };
    setLecturequizlist([...Lecturequizlist, newquiz]);
    onClose();
  };
  const onChangeRemovenumber = (e: any) => {
    let value;
    value = e.target.value;
    value *= 1;
    setRemovenumber(value);
  };
  const onChangeRemove = () => {
    setLecturequizlist(
      Lecturequizlist.filter((item: any) => item.id !== Removenumber)
    );
    onCloseremove();
  };
  const onChangeLecturetitle = (e: any) => {
    setLecturetitle(e.target.value);
  };
  const onChangeLecturemonth = (e: any) => {
    setLecturemonth(e.target.value);
  };
  const onChangeLectureday = (e: any) => {
    setLectureday(e.target.value);
  };
  const onChangeLecturehour = (e: any) => {
    setLecturehour(e.target.value);
  };
  const onChangeLecturemin = (e: any) => {
    setLecturemin(e.target.value);
  };
  const onChangeLecturenotice = (e: any) => {
    setLecturenotice(e.target.value);
  };
  const onChangeLecturelink = (e: any) => {
    setLecturelink(e.target.value);
  };
  const onChangeLectureproblem = (e: any) => {
    setLectureproblem(e.target.value);
  };
  const onChangeLectureanswer = (e: any) => {
    setLectureanswer(e.target.value);
  };
  const onChangeLecturequiztime = (e: any) => {
    setLecturequiztime(e.target.value);
  };
  const showQuiz = Lecturequizlist.map((item: any) => {
    return (
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td>{item.id}</Td>
            <Td>{item.link}</Td>
            <Td>{item.quiztime}</Td>
            <Td>{item.problem}</Td>
            <Td>{item.answer}</Td>
          </Tr>
        </Tbody>
      </Table>
    );
  });
  return (
    <Stack spacing="24px">
      <Center bg="black" h="100px" color="white" fontSize="2xl">
        Create Lecture
      </Center>
      <Heading size="lg" pl="30px">
        Class Title
      </Heading>
      <FormControl pl="30px">
        <Input
          type="text"
          placeholder="Class Title"
          onChange={onChangeLecturetitle}
          w="500px"
          focusBorderColor="black"
        />
      </FormControl>
      <Heading size="md" pl="30px">
        Notice
      </Heading>
      <FormControl pl="30px">
        <Textarea
          placeholder="Description"
          onChange={onChangeLecturenotice}
          focusBorderColor="black"
          w="500px"
        />
      </FormControl>
      <Heading size="md" pl="30px">
        Class Time
      </Heading>
      <HStack pl="30px">
        <Input
          type="text"
          placeholder="M"
          onChange={onChangeLecturemonth}
          w="50px"
          focusBorderColor="black"
        />
        <FormLabel>/</FormLabel>
        <Input
          type="text"
          placeholder="D"
          onChange={onChangeLectureday}
          w="50px"
          focusBorderColor="black"
        />
        <FormLabel>/</FormLabel>
        <Input
          type="text"
          placeholder="H"
          onChange={onChangeLecturehour}
          w="50px"
          focusBorderColor="black"
        />
        <FormLabel>:</FormLabel>
        <Input
          type="text"
          placeholder="M"
          onChange={onChangeLecturemin}
          w="50px"
          focusBorderColor="black"
        />
      </HStack>
      <Heading size="md" pl="30px">
        Youtube Link
      </Heading>
      <FormControl pl="30px">
        <HStack spacing="30px">
          <Input
            type="text"
            placeholder="Youtube Material Link"
            onChange={onChangeLecturelink}
            w="500px"
            focusBorderColor="black"
          />
          <>
            <IconButton
              aria-label="Add to friends"
              icon={<AddIcon />}
              onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create Quiz</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box>Problem Description</Box>
                  <Textarea
                    placeholder="Description"
                    onChange={onChangeLectureproblem}
                    focusBorderColor="black"
                  />
                  <Box>Answer</Box>
                  <Input
                    type="text"
                    placeholder="Problem Answer"
                    onChange={onChangeLectureanswer}
                    focusBorderColor="black"
                  />
                  <Box>Quiz Open Time</Box>
                  <FormLabel>If 07:34 please enter 0734</FormLabel>
                  <Input
                    type="text"
                    placeholder="Quiz pop up time"
                    onChange={onChangeLecturequiztime}
                    focusBorderColor="black"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={onChangeLecturequiz}
                  >
                    Add
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
          <>
            <IconButton
              aria-label="Add to friends"
              icon={<MinusIcon />}
              onClick={onOpenremove}
            />
            <Modal isOpen={isOpenremove} onClose={onCloseremove}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Remove quiz</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box>Which quiz number will be removed?</Box>
                  <Input
                    type="text"
                    placeholder="Quiz number"
                    onChange={onChangeRemovenumber}
                    focusBorderColor="black"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" onClick={onChangeRemove}>
                    Remove
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        </HStack>
      </FormControl>
      <Heading size="md" pl="30px">
        Quiz List
      </Heading>
      <ol>{showQuiz}</ol>
    </Stack>
  );
};

export default AddLecturePage;
