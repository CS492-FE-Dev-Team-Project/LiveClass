import React from 'react';
import { Box, VStack, Heading } from '@chakra-ui/react';
import ChatMessage from './chatMessage';
import Messages from '../data/chatMessages';
import ChatInput from './chatInput';

interface ChatProps {
  header: string;
}

const Chat = ({ header }: ChatProps) => {
  return (
    <Box maxW={100} h="full" backgroundColor="gray.50">
      {header.length > 0 && (
        <Box backgroundColor="gray.200">
          <Heading size="sx">Header</Heading>
        </Box>
      )}
      <VStack spacing={0}>
        {Messages.map(({ userName, message, time, id, isMy }) => (
          <ChatMessage
            key={id}
            userName={userName}
            message={message}
            time={time}
            isMy={isMy}
          />
        ))}
      </VStack>
      <ChatInput />
    </Box>
  );
};

export default Chat;
