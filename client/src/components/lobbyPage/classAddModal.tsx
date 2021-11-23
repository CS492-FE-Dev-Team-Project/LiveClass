import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  HStack
} from '@chakra-ui/react';

import classData from '../../data/classData';
import ClassCard from './classCard';

import {
  initContent,
  createContent,
  joinContent
} from './classAddModalContents';

export enum ClassAddModalState {
  INIT,
  JOIN,
  CREATE
}

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddClassModal = (
  { isOpen, onClose }: AddClassModalProps,
  userclassData2: any
) => {
  const [modalState, setModalState] = React.useState(ClassAddModalState.INIT);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setModalState(ClassAddModalState.INIT);
      }}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent height="500px">
        <ModalHeader textAlign="center">New Class</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} h="300px">
          <HStack justifyContent="center" alignItems="center" w="full" h="full">
            {modalState === ClassAddModalState.INIT &&
              initContent({ setModalState })}
            {modalState === ClassAddModalState.JOIN && joinContent()}
            {modalState === ClassAddModalState.CREATE &&
              createContent({ userclassData2 })}
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AddClassModal;
