import React from 'react';
import { Box } from '@chakra-ui/react';

interface ChatMessageProps {
  userName: string;
  message: string;
  time: string;
  backgroundColor: string;
  color: string;
  fontSize: number | string;
  avatar: string;
}

const ChatMessage = ({
  userName,
  message,
  time,
  backgroundColor,
  color,
  fontSize,
  avatar
}: ChatMessageProps) => {
  return (
    <Box
      backgroundColor={backgroundColor}
      color={color}
      fontSize={fontSize}
    >{`${avatar}:${userName}:${time}:${message}`}</Box>
  );
};

export default ChatMessage;
