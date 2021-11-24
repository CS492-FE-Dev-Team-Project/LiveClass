import React from 'react';

import {
  Input,
  InputGroup,
  Stack,
  Button,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import { ClassAddModalState } from './classAddModal';

interface initContentProps {
  setModalState: (modalState: ClassAddModalState) => void;
}

const initContent = ({ setModalState }: initContentProps) => {
  return (
    <>
      <Button
        w={200}
        h={200}
        onClick={() => {
          setModalState(ClassAddModalState.JOIN);
        }}
      >
        Join
      </Button>
      <Button
        w={200}
        h={200}
        onClick={() => {
          setModalState(ClassAddModalState.CREATE);
        }}
      >
        Create
      </Button>
    </>
  );
};

const joinContent = ({ onChangejoinUUID, handleJoin, onModalClose }: any) => {
  return (
    <Stack>
      <FormControl>
        <FormLabel>Join ID</FormLabel>
        <InputGroup size="lg">
          <Input
            type="text"
            placeholder="Class ID"
            onChange={onChangejoinUUID}
          />
        </InputGroup>
      </FormControl>
      <Button onClick={handleJoin} colorScheme="blue" mr={3}>
        Join
      </Button>
      <Button onClick={onModalClose}>Cancel</Button>
    </Stack>
  );
};

const createContent = ({
  onChangeTitle,
  onChangeSubtitle,
  handleCreate,
  onModalClose
}: any) => {
  console.log(onChangeSubtitle);
  return (
    <Stack>
      <FormControl>
        <FormLabel>Class Title</FormLabel>
        <InputGroup size="lg">
          <Input
            type="text"
            placeholder="Class name"
            onChange={onChangeTitle}
          />
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Class Subtitle</FormLabel>
        <InputGroup>
          <Input
            type="text"
            placeholder="Class Subtitle"
            onChange={onChangeSubtitle}
          />
        </InputGroup>
      </FormControl>
      <Button onClick={handleCreate} colorScheme="blue" mr={3}>
        Save
      </Button>
      <Button onClick={onModalClose}>Cancel</Button>
    </Stack>
  );
};

export { initContent, joinContent, createContent };
