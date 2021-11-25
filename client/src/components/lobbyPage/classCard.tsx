import React from 'react';
import { Box, Image, Flex } from '@chakra-ui/react';

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
  return (
    <Box
      w={300}
      h={200}
      overflow="hidden"
      position="relative"
      borderRadius="30px"
      boxShadow="0 0 1px rgba(0,0,0,1)"
      _hover={{ cursor: 'pointer', boxShadow: '0 0 3px rgba(0,0,0,1)' }}
    >
      {imgSrc && <Image src={imgSrc} alt="Sample Image" />}

      <Flex
        p={4}
        w="full"
        h={imgSrc === undefined ? '100%' : '40%'}
        position="absolute"
        bottom={0}
        backgroundColor={backgroundColor}
        color={color}
      >
        <Box
          pl={3}
          fontSize={20}
          fontWeight="bold"
          display="inline"
          marginTop="auto"
        >
          {`${title}   `}
        </Box>
        <Box fontSize={12} fontWeight="bold" display="inline" marginTop="auto">
          {`${subTitle}`}
        </Box>
      </Flex>
    </Box>
  );
};

export default ClassCard;
