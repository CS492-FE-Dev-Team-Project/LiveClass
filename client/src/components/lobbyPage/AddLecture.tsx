import React from 'react';
import { IconButton, useDisclosure, Heading } from '@chakra-ui/react';
import {
  Box,
  Input,
  InputGroup,
  Button,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption
} from '@chakra-ui/react';
import { Center, Square, Circle } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import YoutubePlayer from 'youtube-player';

import ClassTitle from './createLecture/classTitle';
import ClassNotice from './createLecture/classnotice';
import ClassTime from './createLecture/classTime';
import ClassPlayList from './createLecture/createplaylist';

const AddLecturePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenremove,
    onOpen: onOpenremove,
    onClose: onCloseremove
  } = useDisclosure();
  const [Lecturetitle, setLecturetitle] = React.useState('');
  const [Lecturemonth, setLecturemonth] = React.useState('');
  const [Lectureday, setLectureday] = React.useState('');
  const [Lecturehour, setLecturehour] = React.useState('');
  const [Lecturemin, setLecturemin] = React.useState('');
  const [Lecturenotice, setLecturenotice] = React.useState('');
  const [Lecturelink, setLecturelink] = React.useState('');
  const [Lecturequiztime, setLecturequiztime] = React.useState('');
  const [Lectureproblem, setLectureproblem] = React.useState('');
  const [Lectureanswer, setLectureanswer] = React.useState('');
  const [Removenumber, setRemovenumber] = React.useState('');
  const [Firstflag, setFirstflag] = React.useState(0);
  const [Youtubeplaylist, setYoutubeplaylist] = React.useState('');
  const [Lecturequizhead, setLecturequizhead] = React.useState([
    {
      id: 0,
      link: 'Lecture Link',
      quiztime: 'Lecture Quiz Time',
      problem: 'Lecture Problem',
      answer: 'Lecture Answer'
    }
  ]);
  const [Lecturequizlist, setLecturequizlist] = React.useState([
    {
      id: 1,
      link: ' ',
      quiztime: ' ',
      problem: ' ',
      answer: ' '
    }
  ]);
  const onChangeLecturequiz = () => {
    if (Firstflag === 0) {
      const newquiz = {
        id: Lecturequizlist.length,
        link: Lecturelink,
        quiztime: Lecturequiztime,
        problem: Lectureproblem,
        answer: Lectureanswer
      };
      setLecturequizlist([newquiz]);
      setFirstflag(1);
    } else {
      const newquiz = {
        id: Lecturequizlist.length + 1,
        link: Lecturelink,
        quiztime: Lecturequiztime,
        problem: Lectureproblem,
        answer: Lectureanswer
      };
      setLecturequizlist([...Lecturequizlist, newquiz]);
    }
    onClose();
  };
  const onChangeRemovenumber = (e: any) => {
    let value;
    value = e.target.value;
    value *= 1;
    setRemovenumber(value);
  };
  const onChangeRemove = () => {
    setLecturequizlist(
      Lecturequizlist.filter((item: any) => item.id !== Removenumber)
    );
    onCloseremove();
  };
  const onChangeLecturetitle = (e: any) => {
    setLecturetitle(e.target.value);
  };
  const onChangeLecturemonth = (e: any) => {
    setLecturemonth(e.target.value);
  };
  const onChangeLectureday = (e: any) => {
    setLectureday(e.target.value);
  };
  const onChangeLecturehour = (e: any) => {
    setLecturehour(e.target.value);
  };
  const onChangeLecturemin = (e: any) => {
    setLecturemin(e.target.value);
  };
  const onChangeLecturenotice = (e: any) => {
    setLecturenotice(e.target.value);
  };
  const onChangeYoutubeplaylist = (e: any) => {
    // this function gets youtubeplaylist address
    setYoutubeplaylist(e.target.value);
    // add here to create youtube playlist : array
    // using setYoutubeplaylist to save playlist array
    // ex setYoutubeplaylist([playlist])
  };
  const onChangeLectureproblem = (e: any) => {
    setLectureproblem(e.target.value);
  };
  const onChangeLectureanswer = (e: any) => {
    setLectureanswer(e.target.value);
  };
  const onChangeLecturequiztime = (e: any) => {
    setLecturequiztime(e.target.value);
  };
  const showQuiz = Lecturequizlist.map((item: any) => {
    return (
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td>{item.id}</Td>
            <Td>{item.link}</Td>
            <Td>{item.quiztime}</Td>
            <Td>{item.problem}</Td>
            <Td>{item.answer}</Td>
            <Td>
              <IconButton aria-label="Add to friends" icon={<MinusIcon />} />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    );
  });
  const showQuizhead = Lecturequizhead.map((item: any) => {
    return (
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td>{item.id}</Td>
            <Td>{item.link}</Td>
            <Td>{item.quiztime}</Td>
            <Td>{item.problem}</Td>
            <Td>{item.answer}</Td>
          </Tr>
        </Tbody>
      </Table>
    );
  });
  return (
    <Stack spacing="24px">
      <Center bg="black" h="100px" color="white" fontSize="2xl">
        Create Lecture
      </Center>
      <ClassTitle onChangeLecturetitle={onChangeLecturetitle} />
      <ClassNotice onChangeLecturenotice={onChangeLecturenotice} />
      <ClassTime
        onChangeLecturemonth={onChangeLecturemonth}
        onChangeLectureday={onChangeLectureday}
        onChangeLecturehour={onChangeLecturehour}
        onChangeLecturemin={onChangeLecturemin}
      />
      <Heading size="md" pl="30px">
        Quiz List
      </Heading>
      <ol>{showQuizhead}</ol>
      <ol>{showQuiz}</ol>
      <ClassPlayList
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        onChangeYoutubeplaylist={onChangeYoutubeplaylist}
        onChangeLectureproblem={onChangeLectureproblem}
        onChangeLectureanswer={onChangeLectureanswer}
        onChangeLecturequiztime={onChangeLecturequiztime}
        onChangeLecturequiz={onChangeLecturequiz}
        onOpenremove={onOpenremove}
        isOpenremove={isOpenremove}
        onCloseremove={onCloseremove}
        onChangeRemovenumber={onChangeRemovenumber}
        onChangeRemove={onChangeRemove}
      />
    </Stack>
  );
};

export default AddLecturePage;
