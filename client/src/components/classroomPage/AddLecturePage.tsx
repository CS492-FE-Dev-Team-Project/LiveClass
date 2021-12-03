import React, { useState } from 'react';
import {
  IconButton,
  useDisclosure,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Center,
  Stack,
  Flex,
  Spacer,
  useToast
} from '@chakra-ui/react';
import { DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import LectureTitle from './createLecture/lectureTitle';
import LectureNotice from './createLecture/lectureNotice';
import LectureTime from './createLecture/lectureTime';
import AddPlayList from './createLecture/addPlaylist';
import AddQuizModal from './createLecture/addQuizModal';

import { useSocket } from '../../context/socket';

const AddLecturePage = () => {
  const {
    isOpen: isAddopen,
    onOpen: onAddopen,
    onClose: onAddclose
  } = useDisclosure();

  const [lectureDate, setLectureDate] = useState<Date>(new Date());

  const [lectureTitle, setLectureTitle] = useState<string>('');
  const [lectureNotice, setLectureNotice] = useState<string>('');
  const [lecturePlaylist, setLecturePlaylist] = useState<string>('');

  const [Lecturequiztime, setLecturequiztime] = useState('');
  const [Lectureproblem, setLectureproblem] = useState('');
  const [Lectureanswer, setLectureanswer] = useState('');
  const [Qurrentnumber, setQurrentnumber] = useState('');
  const [Lecturequizhead, setLecturequizhead] = useState([
    {
      id: 0,
      playlist: lecturePlaylist,
      link: 'Lecture Link',
      title: 'Video Title',
      quiztime: 'Lecture Quiz Time',
      problem: 'Lecture Problem',
      answer: 'Lecture Answer',
      mark: 0
    }
  ]);
  const [Lecturequizlist, setLecturequizlist] = useState([
    {
      id: 1,
      playlist: lecturePlaylist,
      link: ' ',
      title: ' ',
      quiztime: ' ',
      problem: ' ',
      answer: ' ',
      mark: 0
    }
  ]);

  const { socket, connected } = useSocket();
  const { classUuid } = useParams();
  const navigate = useNavigate(); // react-router-dom : go back to previous page
  const toast = useToast();

  const onChangeCreate = () => {
    // setLecturequizlist(Lecturequizlist.filter((item: any) => item.mark !== 0));

    const payload = JSON.stringify({
      classUuid,
      lectureDate,
      lectureName: lectureTitle,
      playlist: lecturePlaylist
    });
    socket?.emit('CreateLecture', payload);
    navigate(-1);

    toast({
      title: 'New lecture created',
      status: 'success',
      duration: 1500,
      isClosable: true
    });
  };

  const onChangeLectureTitle = (e: any) => {
    setLectureTitle(e.target.value);
  };
  const onChangeLectureNotice = (e: any) => {
    setLectureNotice(e.target.value);
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
  const onChangeLecturePlaylist = (e: any) => {
    setLecturePlaylist(e.target.value);
  };
  const onClickRemove = (e: any) => {
    removequiz(e.target.id);
  };
  const removequiz = (i: number) => {
    const tempquizlist = [...Lecturequizlist];
    tempquizlist[i - 1].quiztime = ' ';
    tempquizlist[i - 1].problem = ' ';
    tempquizlist[i - 1].answer = ' ';
    tempquizlist[i - 1].mark = 0;
    setLecturequizlist(tempquizlist);
  };
  const showQuiz = Lecturequizlist.map((item: any) => {
    return (
      <Table variant="simple" size="sm">
        <Tbody>
          <Tr align="left">
            <Th align="left" width="5%">
              {item.id}
            </Th>
            <Th align="left" width="15%">
              {item.title}
            </Th>
            <Th align="left" width="10%">
              {item.quiztime}
            </Th>
            <Th align="left" width="15%">
              {item.problem}
            </Th>
            <Th align="left" width="5%">
              {item.answer}
            </Th>
            <Th align="center" width="5%">
              <AddQuizModal
                id={item.id}
                isAddopen={isAddopen}
                onAddopen={onAddopen}
                onAddclose={onAddclose}
                onChangeLectureproblem={onChangeLectureproblem}
                onChangeLectureanswer={onChangeLectureanswer}
                onChangeLecturequiztime={onChangeLecturequiztime}
                Lectureproblem={Lectureproblem}
                Lectureanswer={Lectureanswer}
                Lecturequiztime={Lecturequiztime}
                setQurrentnumber={setQurrentnumber}
                Lecturequizlist={Lecturequizlist}
                Qurrentnumber={Qurrentnumber}
                setLecturequizlist={setLecturequizlist}
              />
            </Th>
            <Th align="center" width="5%">
              <IconButton
                id={item.id}
                aria-label="Add to friends"
                icon={<DeleteIcon />}
                onClick={onClickRemove}
              />
            </Th>
          </Tr>
        </Tbody>
      </Table>
    );
  });
  const showQuizhead = Lecturequizhead.map((item: any) => {
    return (
      <Table variant="simple">
        <Thead>
          <Tr align="left">
            <Th align="left" width="5%">
              {item.id}
            </Th>
            <Th align="left" width="15%">
              {item.title}
            </Th>
            <Th align="left" width="10%">
              {item.quiztime}
            </Th>
            <Th align="left" width="15%">
              {item.problem}
            </Th>
            <Th align="left" width="5%">
              {item.answer}
            </Th>
            <Th align="center" width="5%">
              Add
            </Th>
            <Th align="center" width="5%">
              Remove
            </Th>
          </Tr>
        </Thead>
      </Table>
    );
  });
  return (
    <>
      <Stack spacing="24px">
        <Center bg="black" h="100px" color="white" fontSize="2xl">
          Create Lecture
        </Center>
        <LectureTitle onChangeLecturetitle={onChangeLectureTitle} />
        <LectureNotice onChangeLectureNotice={onChangeLectureNotice} />
        <LectureTime
          lectureDate={lectureDate}
          setLectureDate={setLectureDate}
        />
        <AddPlayList
          Lecturequizlist={Lecturequizlist}
          onChangeLecturePlaylist={onChangeLecturePlaylist}
          Lecturelink={lecturePlaylist}
          setLecturequizlist={setLecturequizlist}
        />
        <Heading size="md" pl="30px">
          Quiz List
        </Heading>
        <ol>{showQuizhead}</ol>
        <ol>{showQuiz}</ol>
      </Stack>
      <br />
      <br />
      <br />
      <Flex>
        <Spacer />
        <Button
          leftIcon={<CheckIcon />}
          colorScheme="blue"
          mr={3}
          w={150}
          h={50}
          onClick={onChangeCreate}
        >
          Create Lecture
        </Button>
        <Button
          leftIcon={<CloseIcon />}
          colorScheme="red"
          mr={50}
          w={150}
          h={50}
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
      </Flex>
      <br />
    </>
  );
};

export default AddLecturePage;
