import React from 'react';
import {
  Stack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Input,
  Button,
  FormLabel,
  Textarea
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

const AddQuizModal = ({
  id,
  isAddopen,
  onAddopen,
  onAddclose,
  onChangeLectureproblem,
  onChangeLectureanswer,
  onChangeLecturequiztime,
  Lectureproblem,
  Lectureanswer,
  Lecturequiztime,
  setQurrentnumber,
  Lecturequizlist,
  Qurrentnumber,
  setLecturequizlist
}: any) => {
  const onAddopenwithnum = (e: any) => {
    setQurrentnumber(e.target.id);
    onAddopen();
  };
  const addquiz = () => {
    const tempquizlist = [...Lecturequizlist];
    tempquizlist[Qurrentnumber - 1].quiztime = Lecturequiztime;
    tempquizlist[Qurrentnumber - 1].problem = Lectureproblem;
    tempquizlist[Qurrentnumber - 1].answer = Lectureanswer;
    tempquizlist[Qurrentnumber - 1].mark = 1;
    setLecturequizlist(tempquizlist);
    onAddclose();
  };
  return (
    <Stack>
      <IconButton
        id={id}
        aria-label="Add to friends"
        icon={<AddIcon />}
        onClick={onAddopenwithnum}
      />
      <Modal isOpen={isAddopen} onClose={onAddclose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Quiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="20px">
              <Stack>
                <Box>Problem Description</Box>
                <Textarea
                  placeholder="Description"
                  onChange={onChangeLectureproblem}
                  focusBorderColor="black"
                />
              </Stack>
              <Stack>
                <Box>Answer</Box>
                <Input
                  type="text"
                  placeholder="Problem Answer"
                  onChange={onChangeLectureanswer}
                  focusBorderColor="black"
                />
              </Stack>
              <Stack>
                <Box>Quiz Open Time</Box>
                <FormLabel>If 07:34 please enter 0734</FormLabel>
                <Input
                  type="text"
                  placeholder="Quiz pop up time"
                  onChange={onChangeLecturequiztime}
                  focusBorderColor="black"
                />
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={addquiz}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default AddQuizModal;
