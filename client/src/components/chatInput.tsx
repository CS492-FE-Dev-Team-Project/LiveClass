import React from 'react';
import { Input } from '@chakra-ui/input';
import { Box, HStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';

const ChatInput = () => {
  return (
    <Box p="10px 8px" backgroundColor="white">
      <Input placeholder="Chat" size="xs" variant="flushed" />
      <HStack>
        <Button size="xs">Q</Button>
        <Button size="xs">Send</Button>
      </HStack>
    </Box>
  );
};

export default ChatInput;
