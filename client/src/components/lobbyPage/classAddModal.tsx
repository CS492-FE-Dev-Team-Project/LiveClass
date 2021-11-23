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

import {
  initContent,
  createContent,
  joinContent
} from './classAddModalContents';
import { Class } from '../../types';

export enum ClassAddModalState {
  INIT,
  JOIN,
  CREATE
}

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  addClass: (newClass: Class) => void;
}

const AddClassModal = ({ isOpen, onClose, addClass }: AddClassModalProps) => {
  const [modalState, setModalState] = React.useState(ClassAddModalState.INIT);
  const [title, setTitle] = React.useState('');
  const [subtitle, setSubtitle] = React.useState('');
  const [joinClassUUID, setJoinUUID] = React.useState('');

  const onChangejoinUUID = (e: any) => {
    setJoinUUID(e.target.value);
  };
  const onChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const onChangeSubtitle = (e: any) => {
    setSubtitle(e.target.value);
  };

  const onModalClose = () => {
    setTitle('');
    setSubtitle('');
    setJoinUUID('');
    onClose();
    setModalState(ClassAddModalState.INIT);
  };

  const handleJoin = () => {
    fetch('http://localhost:5000/api/lobby/class', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uuid: joinClassUUID })
    })
      .then(r => r.json())
      .then(j => {
        if (j.status === 200) {
          addClass(j.class);
          onModalClose();
        } else if (j.status === 400) {
          throw new Error(j.err);
        }
      })
      .catch(e => {
        // TODO: 실패시 에러 핸들링
        console.error(e);
      });
  };

  const handleCreate = () => {
    fetch('http://localhost:5000/api/lobby/class', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, subtitle })
    })
      .then(r => r.json())
      .then(j => {
        if (j.status === 200) {
          addClass(j.class);
          onModalClose();
        } else if (j.status === 400) {
          throw new Error(j.err);
        }
      })
      .catch(e => {
        // TODO: 실패시 에러 핸들링
        console.error(e);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onModalClose} size="xl">
      <ModalOverlay />
      <ModalContent height="500px">
        <ModalHeader textAlign="center">New Class</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} h="300px">
          <HStack justifyContent="center" alignItems="center" w="full" h="full">
            {modalState === ClassAddModalState.INIT &&
              initContent({ setModalState })}
            {modalState === ClassAddModalState.JOIN &&
              joinContent({ onChangejoinUUID, handleJoin, onModalClose })}
            {modalState === ClassAddModalState.CREATE &&
              createContent({
                onChangeTitle,
                onChangeSubtitle,
                handleCreate,
                onModalClose
              })}
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AddClassModal;
