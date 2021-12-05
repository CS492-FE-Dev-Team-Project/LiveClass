import React from 'react';
import { Heading, Text, Stack, HStack, Input, Button } from '@chakra-ui/react';

import { getPlayListItems } from '../../common/playlist';

const AddPlayList = ({
  onChangeLecturePlaylist,
  Lecturelink,
  setLecturequizlist
}: any) => {
  const Youtubelist = [
    {
      id: 1,
      link: '',
      title: '',
      quiztime: '',
      problem: '',
      answer: ''
    }
  ];

  const onClickAdd = () => {
    getPlayListItems(Lecturelink).then(data => {
      data.items.forEach((element: any, idx: number) => {
        const newquiz = {
          id: idx,
          link: element.snippet.resourceId.videoId,
          title: element.snippet.title,
          quiztime: ' ',
          problem: ' ',
          answer: ' ',
          mark: 0
        };
        Youtubelist.push(newquiz);
      });
      setLecturequizlist(Youtubelist);
    });
  };

  const onClickRemove = () => {
    setLecturequizlist([
      {
        id: 1,
        link: ' ',
        quiztime: ' ',
        problem: ' ',
        answer: ' '
      }
    ]);
  };
  return (
    <Stack spacing="24px">
      <Heading size="md" pl="30px">
        Youtube playlist
      </Heading>
      <Text size="sm" pl="30px">
        Input Youtube playlist.
        <br />
        For
        https://www.youtube.com/playlist?list=PLFt2h1jjxKxwQAQr6Dv5kYP4Uu5cGX1iH
        <br />
        Just input PLFt2h1jjxKxwQAQr6Dv5kYP4Uu5cGX1iH
      </Text>
      <HStack spacing="5px" pl="30px">
        <Input
          placeholder="Youtube Material link"
          onChange={evt => onChangeLecturePlaylist(evt)}
          focusBorderColor="black"
          w="500px"
        />
        <Button colorScheme="blue" w={100} onClick={onClickAdd}>
          Add
        </Button>
        <Button colorScheme="red" w={100} onClick={onClickRemove}>
          Remove All
        </Button>
      </HStack>
    </Stack>
  );
};
export default AddPlayList;
