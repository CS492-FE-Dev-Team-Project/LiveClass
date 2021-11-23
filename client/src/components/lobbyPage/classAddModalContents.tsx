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

const joinContent = () => {
  return <Box>JOIN</Box>;
};

const [title, setTitle] = React.useState('');

const onChangename = (e: any) => {
  setTitle(e.target.value);
};

const buttonClicked = (evt: any) => {
  console.log(evt);
  console.log(evt.nativeEvent.data);
};

const createContent = ({ userclassData }: any) => {
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
          <Input type="text" placeholder="Class Subtitle" />
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Color</FormLabel>
        <Select placeholder="Select Color">
          <option>white</option>
          <option>yellow</option>
          <option>blue</option>
          <option>gray</option>
          <option>green</option>
        </Select>
      </FormControl>
      <Button onClick={buttonClicked} colorScheme="blue" mr={3}>
        Save
      </Button>
    </Stack>
  );
};

export { initContent, joinContent, createContent };
