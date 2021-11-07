import React from 'react';
import { Box, Image } from '@chakra-ui/react';

const ClassCard = ({ src, text }: { src: string; text: string }) => {
  return (
    <Box
      w="xs"
      maxH={300}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      _hover={{ cursor: 'pointer', boxShadow: '0 0 1px rgba(0,0,0,1)' }}
    >
      <Image src={src} alt="Sample Image" />

      <Box
        p={4}
        w="full"
        h="40%"
        position="absolute"
        bottom={0}
        borderWidth="1px"
        backgroundColor="gray.50"
        color="green.600"
      >
        <Box pl={3} fontSize={30} fontWeight="bold">
          {text}
        </Box>
      </Box>
    </Box>
  );
};

export default ClassCard;
