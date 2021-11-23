import React from 'react';
import { Button, Box, Select } from '@chakra-ui/react';
import { Input, InputGroup, InputLeftAddon, Stack } from '@chakra-ui/react';
import { FormControl, FormLabel, useDisclosure } from '@chakra-ui/react';
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

const joinContent = ({ onChangejoin, joinClicked, joinCancelClicked }: any) => {
  return (
    <Stack>
      <FormControl>
        <FormLabel>Join ID</FormLabel>
        <InputGroup size="lg">
          <Input type="text" placeholder="Class ID" onChange={onChangejoin} />
        </InputGroup>
      </FormControl>
      <Button onClick={joinClicked} colorScheme="blue" mr={3}>
        Join
      </Button>
      <Button onClick={joinCancelClicked}>Cancel</Button>
    </Stack>
  );
};

const createContent = ({
  onChangename,
  onChangesubtitle,
  onChangecolor,
  saveClicked,
  cancelClicked
}: any) => {
  return (
    <Stack>
      <FormControl>
        <FormLabel>Class name</FormLabel>
        <InputGroup size="lg">
          <Input type="text" placeholder="Class name" onChange={onChangename} />
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Class Subtitle</FormLabel>
        <InputGroup>
          <Input
            type="text"
            placeholder="Class Subtitle"
            onChange={onChangesubtitle}
          />
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Color(default: black)</FormLabel>
        <Select placeholder="Select color" onClick={onChangecolor}>
          <option>white</option>
          <option>yellow</option>
          <option>blue</option>
          <option>gray</option>
          <option>green</option>
        </Select>
      </FormControl>
      <Button onClick={saveClicked} colorScheme="blue" mr={3}>
        Save
      </Button>
      <Button onClick={cancelClicked}>Cancel</Button>
    </Stack>
  );
};

export { initContent, joinContent, createContent };
