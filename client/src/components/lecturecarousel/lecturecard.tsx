import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Spacer,
  Text,
  Button,
  Image,
  AspectRatio,
  Heading,
  useColorModeValue,
  extendTheme
} from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { getPlayListItems } from '../common/playlist';

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px'
});
const theme = extendTheme({ breakpoints });

const LectureCard = ({
  lectureNum,
  youtubePlayList,
  isLive,
  date,
  to,
  key,
  lectureName
}: any) => {
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  useEffect(() => {
    getPlayListItems(youtubePlayList).then(v => {
      setThumbnailUrl(v.items[0].snippet.thumbnails.standard.url);
    });
  }, []);

  return (
    <Box
      w="100%"
      h="60vh"
      rounded="md"
      boxShadow="md"
      bgColor={isLive ? 'red.200' : 'white'}
      borderColor={isLive ? 'red' : 'black'}
      overflow="hidden"
    >
      <Flex h="100%" flexDirection="column">
        <AspectRatio ratio={16 / 9}>
          <Image src={thumbnailUrl} fit="cover" h="40%" />
        </AspectRatio>
        <Flex
          h="100%"
          flexDirection="column"
          textAlign="center"
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align="center"
        >
          {isLive ? (
            <Text
              fontSize="lg"
              fontWeight="bold"
              bg="red.100"
              p={2}
              px={3}
              color="red"
              rounded="full"
            >
              Live
            </Text>
          ) : (
            <Text
              fontSize="lg"
              fontWeight="bold"
              bg="green.100"
              p={2}
              px={3}
              color="green.500"
              rounded="full"
            >
              {`${date}`}
            </Text>
          )}
          <Spacer />
          <Box>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={{
                base: '12px',
                md: '20px',
                lg: '26px',
                xl: '30px',
                '2xl': '42px'
              }}
              fontFamily="body"
            >
              {lectureName}
            </Heading>
          </Box>
          <Spacer />
          <Link to={to} key={key}>
            <Button
              w="100%"
              h="40px"
              bg="green.400"
              color="white"
              fontSize="15px"
              rounded="xl"
              boxShadow="0 5px 20px 0px rgb(72 187 120 / 43%)"
              _hover={{
                bg: 'green.500'
              }}
              _focus={{
                bg: 'green.500'
              }}
            >
              Go To Lecture
            </Button>
          </Link>
          <Box h="30px" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default LectureCard;
