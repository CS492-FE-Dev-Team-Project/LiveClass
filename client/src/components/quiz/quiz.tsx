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

import { Stack } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/react';
import { Input } from '@chakra-ui/input';

const QuizUser = ({ quiz, disclosure }: any) => {
  const { isOpen, onOpen, onClose } = disclosure;
  const [value, setValue] = React.useState('1');
  if (quiz.quiztype) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{quiz.quizTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>{quiz.quizContents}</Box>
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
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{quiz.quizTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction="column">
              <Radio value={quiz.quizOption[0]}>
                {quiz.quizAnswerOption[0]}
              </Radio>
              <Radio value={quiz.quizOption[1]}>
                {quiz.quizAnswerOption[1]}
              </Radio>
              <Radio value={quiz.quizOption[2]}>
                {quiz.quizAnswerOption[2]}
              </Radio>
              <Radio value={quiz.quizOption[3]}>
                {quiz.quizAnswerOption[3]}
              </Radio>
            </Stack>
          </RadioGroup>
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

export default QuizUser;
