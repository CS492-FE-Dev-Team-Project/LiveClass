import React from 'react';
import { Box, Image } from '@chakra-ui/react';

interface ClassCardProps {
  imgSrc: string;
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
      <Image src={imgSrc} alt="Sample Image" />

      <Box
        p={4}
        w="full"
        h="40%"
        position="absolute"
        bottom={0}
        backgroundColor={backgroundColor}
        color={color}
      >
        <Box pl={3} fontSize={20} fontWeight="bold" display="inline">
          {`${title} | `}
        </Box>
        <Box fontSize={12} fontWeight="bold" display="inline">
          {`${subTitle}`}
        </Box>
      </Box>
    </Box>
  );
};

export default ClassCard;
