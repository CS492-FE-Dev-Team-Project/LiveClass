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

const QuizComponent = ({ quiz, disclosure }: any) => {
  const { isOpen, onOpen, onClose } = disclosure;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{quiz.quizTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>{quiz.quizContents}</Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Yes
          </Button>
          <Button colorScheme="red">No</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuizComponent;
