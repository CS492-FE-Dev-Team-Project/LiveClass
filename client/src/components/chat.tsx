import React, { useState, useEffect, useRef } from 'react';
import { CloseButton, Flex } from '@chakra-ui/react';
import ChatMessage from './chatMessage';
import ChatInput from './chatInput';
import Header from './common/Header';

import { useSocket } from '../context/socket';
import dummyMessages from '../data/chatMessages'; // 🐛 Dummy message - call DB API to get real data

interface ChatProps {
  header: string;
  hasHeader: boolean;
}

// 🚨 Possible duplicate with 'interface ChatMessageProps' in 'chatMessage.tsx'
interface Message {
  userName: string;
  message: string;
  time: string;
  id: number;
  isMy: boolean;
}

// 0 : live chatting, 1 : discussion mode (timeMarker), 2 : ...
enum ChatMode {
  Live,
  MarkerDiscussion
}

const Chat = ({ header, hasHeader }: ChatProps) => {
  const { socket, connected } = useSocket();
  const [messages, setMessages] = useState<Array<Message>>([]);
  const chatMode = useRef<ChatMode>(ChatMode.Live);

  // Socket listeners
  useEffect(() => {
    // TimeMarker Click event - fetch discussion messages
    socket?.on('TimeMarkerClicked', (markerId: number) => {
      // 🐛 (API) Fetch timeMarker thread messages
      setMessages(dummyMessages.slice(markerId * 3, markerId * 3 + 3));
      chatMode.current = ChatMode.MarkerDiscussion;
    });
  }, [connected]);

  // Click 'X' close button in the header
  // 1) chatMode.current == discussion mode : change to Live mode; fetch Live chat messages
  // 2) chatMode.current == Live chatting : clear chat
  const backToLiveChat = () => {
    setMessages([]); // 🐛 (API?) Fetch Live chat message
    chatMode.current = ChatMode.Live;
  };

  const createMessage = (message: string) => {
    // 🐛 (API) Create message
    // Providing info : message (string)
    const dummyMessageObj = {
      id: 999,
      userName: 'MyName',
      message,
      time: '00:00',
      isMy: true
    };

    // Update local chatBox
    setMessages(arr => [...arr, dummyMessageObj]);

    // Update DB
    switch (chatMode.current) {
      case ChatMode.MarkerDiscussion:
        console.log('(DB API) Create markerDiscussion message');
        break;
      default:
        // ChatMode.Live
        console.log('Create Live message');
    }
  };

  return (
    <Flex w="350px" h="100vh" backgroundColor="gray.50" flexDir="column">
      {hasHeader && (
        <Header
          backgroundColor="gray.200"
          color="black"
          headingSize="md"
          headingText={header}
          p={2}
        >
          <CloseButton marginLeft="auto" size="sm" onClick={backToLiveChat} />
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
      <ChatInput sendMessage={(msg: string) => createMessage(msg)} />
    </Flex>
  );
};

export default Chat;
