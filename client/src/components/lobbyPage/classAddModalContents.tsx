import React from 'react';
import { Button, Box } from '@chakra-ui/react';
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

const createContent = () => {
  return <Box>CREATE</Box>;
};

export { initContent, joinContent, createContent };
