import React from 'react';
import { Button, Box } from '@chakra-ui/react';
import { ClassAddState } from './classAddModal';

interface initContentProps {
  setModalState: (modalState: ClassAddState) => void;
}

const initContent = ({ setModalState }: initContentProps) => {
  return (
    <>
      <Button
        w={200}
        h={200}
        onClick={() => {
          setModalState(ClassAddState.JOIN);
        }}
      >
        Join
      </Button>
      <Button
        w={200}
        h={200}
        onClick={() => {
          setModalState(ClassAddState.CREATE);
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

const createContent = () => {
  return <Box>CREATE</Box>;
};

export { initContent, joinContent, createContent };
