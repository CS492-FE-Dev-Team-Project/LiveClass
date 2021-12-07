import React, { useState, useEffect, useRef } from 'react';
import { CloseButton, Flex } from '@chakra-ui/react';

import ChatMessage from './chatMessage';
import ChatInput from './chatInput';
import Header from './common/Header';

import { MarkerType, TextMessageResponse } from '../types';

import { useSocket } from '../context/socket';
import useMe from '../hooks/useMe';

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
  classUuid: string;
  lectureId: number;
  customHeader?: string;
}

// 🚨 Possible duplicate with 'interface ChatMessageProps' in 'chatMessage.tsx'
interface Message {
  messageId: number;
  userName: string;
  message: string;
  time: string;
  isMy: boolean;
}

const Chat = ({
  hasHeader,
  classUuid,
  lectureId,
  customHeader = ''
}: ChatProps) => {
  const { socket, connected } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatStatus, setChatStatus] = useState<ChatStatus>({
    chatMode: ChatMode.Live
  });
  const currentMarkerId = useRef<number>(-1);
  const { id: myId } = useMe();

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
        setChatStatus({ chatMode: ChatMode.Marker, markerType });
      }
    );

    // Live chat event - get live chat message
    socket?.on('LiveChatTextMessage', ({ message, status }) => {
      if (status === 200) {
        const {
          dateStr,
          senderId,
          senderName,
          text,
          messageId
        }: TextMessageResponse = message;
        const dateObj = new Date(dateStr);
        const messageObj: Message = {
          messageId,
          userName: senderName,
          message: text,
          time: `${dateObj.getHours()}:${dateObj.getMinutes()}`,
          isMy: senderId === myId
        };
        setMessages(arr => [...arr, messageObj]);
      }
    });
  }, [connected]);

  // Click 'X' close button in the header
  // 1) chatMode.current == discussion mode : change to Live mode; fetch Live chat messages
  // 2) chatMode.current == Live chatting : clear chat
  const backToLiveChat = () => {
    setChatStatus({ chatMode: ChatMode.Live });
    setMessages([]); // 🐛 (API?) Fetch Live chat message
  };

  const createMessage = (text: string) => {
    // 🐛 (API) Create message
    // Providing info : message (string)

    // Send message
    socket?.emit(
      'LiveChatTextMessage',
      JSON.stringify({
        classUuid,
        lectureId,
        text
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

  const colorPick = () => {
    switch (chatStatus.chatMode) {
      case ChatMode.Live:
        return 'gray.50';
      case ChatMode.Marker:
        return chatStatus.markerType === MarkerType.QUESTION
          ? '#FF4A3E'
          : '#3D9AFC';
      case ChatMode.Individual:
        return '#298977';
      default:
        throw new Error('Invalid MarkerType');
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
          backgroundColor={colorPick()}
          color="black"
          headingSize="md"
          headingText={header}
          p="5px 15px"
        >
          <CloseButton marginLeft="auto" size="md" onClick={backToLiveChat} />
        </Header>
      )}
      <Flex w="280px" overflowY="auto" pb={3} pt={3} flexDir="column" h="full">
        {messages.map(({ userName, message, time, messageId, isMy }) => (
          <ChatMessage
            key={messageId}
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
