import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import ChatMessage from './chatMessage';
import Messages from '../data/chatMessages';

const Chat = () => {
  return (
    <Box maxW={100} h="full">
      <VStack>
        {Messages.map(({ userName, message, time, id }) => (
          <ChatMessage
            key={id}
            userName={userName}
            message={message}
            time={time}
            backgroundColor="gray.50"
            color="gray.500"
            fontSize="10px"
            avatar="none"
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Chat;
