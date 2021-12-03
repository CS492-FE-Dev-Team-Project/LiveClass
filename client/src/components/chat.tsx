import React, { useState, useEffect, useRef } from 'react';
import { CloseButton, Flex } from '@chakra-ui/react';

import ChatMessage from './chatMessage';
import ChatInput from './chatInput';
import Header from './common/Header';

import { MarkerType } from '../types';

import { useSocket } from '../context/socket';
import useMe from '../hooks/useMe';
import dummyMessages from '../data/chatMessages'; // 🐛 Dummy message - call DB API to get real data

enum ChatMode {
  Marker = 'Marker',
  Live = 'Live',
  Individual = 'Individual'
}

type ChatStatus =
  | {
      chatMode: ChatMode.Live;
    }
  | { chatMode: ChatMode.Marker; markerType: MarkerType }
  | { chatMode: ChatMode.Individual; peer: { id: number; name: string } };

interface ChatProps {
  hasHeader: boolean;
  room: string;
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

const Chat = ({ hasHeader, room, customHeader = '' }: ChatProps) => {
  const { socket, connected } = useSocket();
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [chatStatus, setChatStatus] = useState<ChatStatus>({
    chatMode: ChatMode.Live
  });
  const currentMarkerId = useRef<number>(-1);
  const { userName: currentUserName } = useMe();

  // Set Chat header title
  const pickHeader = (chatStat: ChatStatus) => {
    switch (chatStat.chatMode) {
      case ChatMode.Live:
        return 'Live Chat';
      case ChatMode.Marker:
        return chatStat.markerType === MarkerType.QUESTION
          ? 'Question'
          : 'Discussion';
      case ChatMode.Individual:
        return chatStat.peer.name;
      default:
        throw new Error('Invalid ChatStatus');
    }
  };
  const header = pickHeader(chatStatus);

  // Socket listeners
  useEffect(() => {
    // TimeMarker Click event - fetch discussion messages
    socket?.on(
      'TimeMarkerClicked',
      (markerId: number, markerType: MarkerType) => {
        // 🐛 (API) Fetch timeMarker thread messages
        currentMarkerId.current = markerId;
        // setChatMode(markerType as number);
        setMessages(dummyMessages.slice(markerId * 3, markerId * 3 + 3));
      }
    );

    // Live chat event - get live chat message
    socket?.on('ChatTextMessage', (payload: string) => {
      const { dateStr, textMessage, chatUserName, isMy } = JSON.parse(payload);

      const dateObj = new Date(dateStr);

      const dummyMessageObj: Message = {
        id: 999, // 🐛 Get rid of id?
        userName: chatUserName,
        message: textMessage,
        time: `${dateObj.getHours()}:${dateObj.getMinutes()}`,
        isMy
      };

      setMessages(arr => [...arr, dummyMessageObj]);
    });
  }, [connected]);

  // Click 'X' close button in the header
  // 1) chatMode.current == discussion mode : change to Live mode; fetch Live chat messages
  // 2) chatMode.current == Live chatting : clear chat
  const backToLiveChat = () => {
    setChatStatus({ chatMode: ChatMode.Live });
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

    // Send message
    socket?.emit(
      'ChatTextMessage',
      JSON.stringify({
        classUuid: room,
        currentUserName,
        textMessage: message
      })
    );

    // Update DB
    switch (chatStatus.chatMode) {
      case ChatMode.Marker:
        console.log('(DB API) Create markerDiscussion message');
        break;
      default:
        // ChatMode.LIVE - No need to store messages on DB
        console.log('Create Live message');
    }
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
