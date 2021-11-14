import React from 'react';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button
} from '@chakra-ui/react';

import { FormControl, FormLabel } from '@chakra-ui/form-control';

import { Input } from '@chakra-ui/input';

import { Field, FieldArray, Form, Formik, getIn } from 'formik';

const CreateQuiz = ({ quiz, disclosure }: any) => {
  const { isOpen, onOpen, onClose } = disclosure;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Quiz</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>{quiz.quizTitle}</Box>
          <Input type="text" placeholder="Write problem here" />
          <Box>{quiz.quizAnswer}</Box>
          <Input type="text" placeholder="Write answer here" />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Submit
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateQuiz;
