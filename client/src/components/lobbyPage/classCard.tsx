import React from 'react';
import { Box, Image, Flex } from '@chakra-ui/react';
import stc from 'string-to-color';

interface ClassCardProps {
  imgSrc?: string;
  title: string;
  subTitle: string;
  color: string;
  backgroundColor: string;
}

const ClassCard = ({
  imgSrc,
  title,
  subTitle,
  color,
  backgroundColor
}: ClassCardProps) => {
  const classColor = stc({ title });
  const regexColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    classColor
  );
  const r = regexColor ? parseInt(regexColor[1], 16) : 0;
  const g = regexColor ? parseInt(regexColor[2], 16) : 0;
  const b = regexColor ? parseInt(regexColor[3], 16) : 0;
  const isDark = r + g + b < 127 * 3;

  return (
    <Box
      w={240}
      h={150}
      overflow="hidden"
      position="relative"
      borderRadius="30px"
      color={isDark ? 'white' : 'black'}
      _hover={{ cursor: 'pointer', boxShadow: '0 0 3px rgba(0,0,0,1)' }}
    >
      <Flex
        p={4}
        w="full"
        h="100%"
        position="absolute"
        bottom={0}
        backgroundColor={classColor}
        direction="column"
      >
        <Box
          pl="5px"
          fontSize={40}
          fontWeight="bold"
          display="inline"
          marginTop="auto"
        >
          {`${title}   `}
        </Box>
        <Box pl="5px" fontSize={20} fontWeight="bold" display="inline">
          {`${subTitle}`}
        </Box>
      </Flex>
    </Box>
  );
};

export default ClassCard;
