import React, { useState, useEffect } from 'react';
import { CloseButton, Flex } from '@chakra-ui/react';
import ChatMessage from './chatMessage';
import ChatInput from './chatInput';
import Header from './common/Header';

import { useSocket } from '../lib/socket';
import dummyMessages from '../data/chatMessages'; // 🐛 Dummy message - call DB API to get real data

interface ChatProps {
  header: string;
  hasHeader: boolean;
}

interface Message {
  userName: string;
  message: string;
  time: string;
  id: number;
  isMy: boolean;
}

const Chat = ({ header, hasHeader }: ChatProps) => {
  const { socket, connected } = useSocket();
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    // TimeMarker Click event - fetch discussion messages
    socket?.on('TimeMarkerClicked', (markerId: number) => {
      // 🐛 get real 'messages' data related with timeMarker by calling DB API
      setMessages(dummyMessages.slice(markerId * 3, markerId * 3 + 3));
    });
  }, [connected]);

  return (
    <Flex w={300} h="100vh" backgroundColor="gray.50" flexDir="column">
      {hasHeader && (
        <Header
          backgroundColor="gray.200"
          color="black"
          headingSize="sx"
          headingText={header}
          p={2}
        >
          <CloseButton marginLeft="auto" size="sm" />
        </Header>
      )}
      <Flex overflowY="auto" pb={3} pt={3} flexDir="column" h="full">
        {messages.map(({ userName, message, time, id, isMy }) => (
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
