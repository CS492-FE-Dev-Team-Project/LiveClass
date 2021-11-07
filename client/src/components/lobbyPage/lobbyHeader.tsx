import React from 'react';
import { Box, Heading } from '@chakra-ui/layout';

interface LobbyHeaderProps {
  backgroundColor: string;
  color: string;
  title: string;
}

const LobbyHeader = ({ backgroundColor, color, title }: LobbyHeaderProps) => {
  return (
    <Box width="full" p={8} backgroundColor={backgroundColor} color={color}>
      <Heading>{title}</Heading>
    </Box>
  );
};

export default LobbyHeader;
