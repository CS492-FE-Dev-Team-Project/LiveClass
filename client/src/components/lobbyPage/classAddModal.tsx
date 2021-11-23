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
  const [Title, setTitle] = React.useState('');
  const [Subtitle, setSubtitle] = React.useState('');
  const [PageColor, setColor] = React.useState('');
  const [Joinid, setJoinid] = React.useState('');
  const [tempClasses, setClasses] = React.useState({
    id: 0,
    imgSrc: 'https://bit.ly/2Z4KKcF',
    title: 'CS330',
    subTitle: 'Operating Systems',
    color: 'white',
    backgroundColor: 'black',
    memberType: 'Instructor'
  });
  const onChangejoin = (e: any) => {
    setJoinid(e.target.value);
  };
  const onChangename = (e: any) => {
    setTitle(e.target.value);
  };
  const onChangesubtitle = (e: any) => {
    setSubtitle(e.target.value);
  };
  const onChangecolor = (e: any) => {
    let Color = 'select';
    let index = 0;
    if (typeof e.target.options.selectedIndex !== 'undefined') {
      index = e.target.options.selectedIndex;
    }
    switch (index) {
      default:
        Color = 'black';
        break;
      case 1:
        Color = 'white';
        break;
      case 2:
        Color = 'yellow.50';
        break;
      case 3:
        Color = 'blue';
        break;
      case 4:
        Color = 'gray.50';
        break;
      case 5:
        Color = 'green';
        break;
    }
    setColor(Color);
  };
  const saveClicked = (evt: any) => {
    setClasses({
      id: 0,
      imgSrc: 'https://bit.ly/2Z4KKcF',
      title: Title,
      subTitle: Subtitle,
      color: PageColor,
      backgroundColor: 'black',
      memberType: 'Instructor'
    });
    console.log(tempClasses);
  };
  const cancelClicked = (evt: any) => {
    setTitle('');
    setSubtitle('');
    setColor('');
    onClose();
    setModalState(ClassAddModalState.INIT);
  };
  const joinClicked = (evt: any) => {
    // add data here
  };
  const joinCancelClicked = (evt: any) => {
    onClose();
    setModalState(ClassAddModalState.INIT);
  };
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
            {modalState === ClassAddModalState.JOIN &&
              joinContent({
                onChangejoin,
                joinClicked,
                joinCancelClicked
              })}
            {modalState === ClassAddModalState.CREATE &&
              createContent({
                onChangename,
                onChangesubtitle,
                onChangecolor,
                saveClicked,
                cancelClicked
              })}
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AddClassModal;
