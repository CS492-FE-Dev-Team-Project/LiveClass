import React from 'react';
import { Heading, Text, Stack, HStack, Input, Button } from '@chakra-ui/react';

import axios from 'axios';

const AddPlayList = ({
  onChangeLecturelink,
  Lecturelink,
  setLecturequizlist
}: any) => {
  let Youtubelist = [
    {
      id: 1,
      link: '',
      title: '',
      quiztime: '',
      problem: '',
      answer: ''
    }
  ];
  const getPlayListItems = async (playlistID: any) => {
    const result = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems`,
      {
        params: {
          part: 'id,snippet',
          maxResults: 10,
          playlistId: playlistID,
          key: process.env.REACT_APP_YOUTUBE_API_KEY
        }
      }
    );
    return result.data;
  };
  const onClickAdd = () => {
    getPlayListItems(Lecturelink).then(data => {
      let i = 1;
      data.items.forEach((element: any) => {
        if (i === 1) {
          const newquiz = [
            {
              id: 1 + 1 - 1,
              link: element.snippet.resourceId.videoId,
              title: element.snippet.title,
              quiztime: ' ',
              problem: ' ',
              answer: ' ',
              mark: 0
            }
          ];
          Youtubelist = newquiz;
          i += 1;
        } else {
          const newquiz = {
            id: i,
            link: element.snippet.resourceId.videoId,
            title: element.snippet.title,
            quiztime: ' ',
            problem: ' ',
            answer: ' ',
            mark: 0
          };
          Youtubelist.push(newquiz);
          i += 1;
        }
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
      <HStack spacing="30px" pl="30px">
        <Input
          placeholder="Youtube Material link"
          onChange={onChangeLecturelink}
          focusBorderColor="black"
          w="500px"
        />
        <Button colorScheme="blue" mr={3} onClick={onClickAdd}>
          Add
        </Button>
        <Button colorScheme="red" mr={3} onClick={onClickRemove}>
          Remove All
        </Button>
      </HStack>
    </Stack>
  );
};

export default AddPlayList;
