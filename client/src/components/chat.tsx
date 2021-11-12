import React from 'react';
import { Heading, CloseButton, Flex } from '@chakra-ui/react';
import ChatMessage from './chatMessage';
import Messages from '../data/chatMessages';
import ChatInput from './chatInput';

interface ChatProps {
  header: string;
  hasHeader: boolean;
}

const Chat = ({ header, hasHeader }: ChatProps) => {
  return (
    <Flex maxW={200} h="100vh" backgroundColor="gray.50" flexDir="column">
      {hasHeader && (
        <Flex backgroundColor="gray.200" flexDir="row">
          <Heading size="sx" m={2}>
            {header}
          </Heading>
          <CloseButton marginLeft="auto" size="sm" />
        </Flex>
      )}
      <Flex overflowY="auto" pb={3} pt={3} flexDir="column" h="full">
        {Messages.map(({ userName, message, time, id, isMy }) => (
          <ChatMessage
            key={id}
            userName={userName}
            message={message}
            time={time}
            isMy={isMy}
          />
        ))}
      </Flex>
      <ChatInput />
    </Flex>
  );
};

export default Chat;
