import React, { useState, useEffect, useRef, useContext } from 'react';
import { CloseButton, Flex } from '@chakra-ui/react';
import axios from 'axios';

import ChatMessage from './chatMessage';
import ChatInput from './chatInput';
import Header from './common/Header';

import { LanguageType, MarkerType, TextMessageResponse } from '../types';

import { useSocket } from '../context/socket';
import useMe from '../hooks/useMe';
import langContext from '../context/language/languageContext';

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
  message: {
    ko: {
      result: string;
      status: number;
    };
    en: {
      result: string;
      status: number;
    };
  };
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
  const chatStatus = useRef<ChatStatus>({
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
  const header = pickHeader(chatStatus.current);
  const { language } = useContext(langContext);

  // @args {MarkerTextMessageEntity} message - message response from the server
  const createNewMessageObj = (messageResponse: any): Message => {
    const {
      dateStr,
      senderId,
      senderName,
      text,
      messageId
    }: TextMessageResponse = messageResponse;
    const dateObj = new Date(dateStr);
    const messageObj: Message = {
      messageId, // Live chat doesn't have messageId
      userName: senderName,
      message: text,
      time: `${dateObj.getHours()}:${dateObj.getMinutes()}`,
      isMy: senderId === myId
    };
    return messageObj;
  };

  // Socket listeners
  useEffect(() => {
    // TimeMarker Click event - fetch discussion messages
    socket?.on(
      'TimeMarkerClicked',
      (markerId: number, markerType: MarkerType) => {
        currentMarkerId.current = markerId;
        chatStatus.current = { chatMode: ChatMode.Marker, markerType };
        socket?.emit('GetMarkerMessages', JSON.stringify({ markerId }));
      }
    );

    // Retrieve saved marker messages
    socket?.on('GetMarkerMessages', ({ textMessages, status }) => {
      setMessages(arr => []); // clear

      const retrievedMessages: Message[] = textMessages.map(
        (messageResponse: any) => createNewMessageObj(messageResponse)
      );
      setMessages(arr => [...arr, ...retrievedMessages]);
    });

    // Live chat event - get live chat message
    socket?.on('LiveChatTextMessage', ({ message, status }) => {
      if (status === 200 && chatStatus.current.chatMode === ChatMode.Live) {
        setMessages(arr => [...arr, createNewMessageObj(message)]);
      }
    });

    // Marker chat event - get marker chat message
    socket?.on('MarkerTextMessage', ({ markerId, savedMessage, status }) => {
      if (
        status === 200 &&
        chatStatus.current.chatMode === ChatMode.Marker &&
        currentMarkerId.current === markerId
      ) {
        setMessages(arr => [...arr, createNewMessageObj(savedMessage)]);
      }
    });
  }, [connected]);

  // Click 'X' close button in the header
  // 1) chatMode.current == discussion mode : change to Live mode; fetch Live chat messages
  // 2) chatMode.current == Live chatting : clear chat
  const backToLiveChat = () => {
    chatStatus.current = { chatMode: ChatMode.Live };
    setMessages([]); // 🐛 (API?) Fetch Live chat message
  };

  const createMessage = (text: string) => {
    if (text.trim().length === 0) return; // ignore empty string

    // Create and send message
    switch (chatStatus.current.chatMode) {
      case ChatMode.Live:
        socket?.emit(
          'LiveChatTextMessage',
          JSON.stringify({
            classUuid,
            lectureId,
            text
          })
        );
        break;
      case ChatMode.Marker:
        socket?.emit(
          'MarkerTextMessage',
          JSON.stringify({
            classUuid,
            lectureId,
            markerTextMessage: {
              markerId: currentMarkerId.current,
              message: text
            }
          })
        );
        break;
      case ChatMode.Individual:
        break;
      default:
        throw new Error('Invalid ChatStatus');
    }
  };

  const colorPick = () => {
    switch (chatStatus.current.chatMode) {
      case ChatMode.Live:
        return 'gray.50';
      case ChatMode.Marker:
        return chatStatus.current.markerType === MarkerType.QUESTION
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
            message={
              language === LanguageType.KO
                ? message.ko.result
                : message.en.result
            }
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
