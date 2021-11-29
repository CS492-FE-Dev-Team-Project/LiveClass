import React, { useState, useEffect, useRef } from 'react';
import { CloseButton, Flex } from '@chakra-ui/react';

import ChatMessage from './chatMessage';
import ChatInput from './chatInput';
import Header from './common/Header';

import { MarkerType } from '../types';

import { useSocket } from '../context/socket';
import dummyMessages from '../data/chatMessages'; // 🐛 Dummy message - call DB API to get real data

interface ChatProps {
  hasHeader: boolean;
  customHeader?: string;
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
  QUESTION,
  QUIZ,
  NOTICE,
  DISCUSSION,
  LIVE
}

const Chat = ({ hasHeader, customHeader = '' }: ChatProps) => {
  const { socket, connected } = useSocket();
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [chatMode, setChatMode] = useState<ChatMode>(ChatMode.LIVE);
  const currentMarkerId = useRef<number>(-1);

  // Set Chat header title
  const pickHeader = ['Question', 'Quiz', 'Notice', 'Discussion'];
  let header = customHeader;
  if (header === '') {
    header = chatMode === ChatMode.LIVE ? 'Live Chat' : pickHeader[chatMode];
  }

  // Socket listeners
  useEffect(() => {
    // TimeMarker Click event - fetch discussion messages
    socket?.on(
      'TimeMarkerClicked',
      (markerId: number, markerType: MarkerType) => {
        // 🐛 (API) Fetch timeMarker thread messages
        currentMarkerId.current = markerId;
        setChatMode(markerType as number);
        setMessages(dummyMessages.slice(markerId * 3, markerId * 3 + 3));
      }
    );
  }, [connected]);

  // Click 'X' close button in the header
  // 1) chatMode.current == discussion mode : change to Live mode; fetch Live chat messages
  // 2) chatMode.current == Live chatting : clear chat
  const backToLiveChat = () => {
    setChatMode(ChatMode.LIVE);
    setMessages([]); // 🐛 (API?) Fetch Live chat message
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
    switch (chatMode) {
      case ChatMode.DISCUSSION:
        console.log('(DB API) Create markerDiscussion message');
        break;
      default:
        // ChatMode.LIVE
        console.log('Create Live message');
    }
  };

  const changeMarkerType = (markerType: MarkerType) => {
    // 🐛 Use API to change the type of the marker
    setChatMode(markerType as number);
  };

  return (
    <Flex
      w="auto"
      h="100vh"
      backgroundColor="gray.50"
      flexDir="column"
      align="center"
    >
      {hasHeader && (
        <Header
          backgroundColor="gray.200"
          color="black"
          headingSize="md"
          headingText={header}
          p="5px 15px"
        >
          <CloseButton marginLeft="auto" size="md" onClick={backToLiveChat} />
        </Header>
      )}
      <Flex w="280px" overflowY="auto" pb={3} pt={3} flexDir="column" h="full">
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
