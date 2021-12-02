import React from 'react';
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
  Stack
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import ClassTitle from './createLecture/classTitle';
import ClassNotice from './createLecture/classnotice';
import ClassTime from './createLecture/classTime';
import AddPlayList from './createLecture/addplaylist';
import AddQuizModal from './createLecture/addquizmodal';

const AddLecturePage = () => {
  const {
    isOpen: isAddopen,
    onOpen: onAddopen,
    onClose: onAddclose
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
  const [Qurrentnumber, setQurrentnumber] = React.useState('');
  const [Lecturequizhead, setLecturequizhead] = React.useState([
    {
      id: 0,
      playlist: Lecturelink,
      link: 'Lecture Link',
      title: 'Video Title',
      quiztime: 'Lecture Quiz Time',
      problem: 'Lecture Problem',
      answer: 'Lecture Answer',
      mark: 0
    }
  ]);
  const [Lecturequizlist, setLecturequizlist] = React.useState([
    {
      id: 1,
      playlist: Lecturelink,
      link: ' ',
      title: ' ',
      quiztime: ' ',
      problem: ' ',
      answer: ' ',
      mark: 0
    }
  ]);
  const onChangeCreate = () => {
    setLecturequizlist(Lecturequizlist.filter((item: any) => item.mark !== 0));
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
  const onChangeLectureproblem = (e: any) => {
    setLectureproblem(e.target.value);
  };
  const onChangeLectureanswer = (e: any) => {
    setLectureanswer(e.target.value);
  };
  const onChangeLecturequiztime = (e: any) => {
    setLecturequiztime(e.target.value);
  };
  const onChangeLecturelink = (e: any) => {
    setLecturelink(e.target.value);
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
      <AddPlayList
        Lecturequizlist={Lecturequizlist}
        onChangeLecturelink={onChangeLecturelink}
        Lecturelink={Lecturelink}
        setLecturequizlist={setLecturequizlist}
      />
      <Heading size="md" pl="30px">
        Quiz List
      </Heading>
      <ol>{showQuizhead}</ol>
      <ol>{showQuiz}</ol>
      <Button colorScheme="blue" mr={3} onClick={onChangeCreate}>
        Create Lecture
      </Button>
    </Stack>
  );
};

export default AddLecturePage;
