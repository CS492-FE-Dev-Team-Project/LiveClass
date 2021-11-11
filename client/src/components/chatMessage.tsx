import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

interface ChatMessageProps {
  userName: string;
  message: string;
  time: string;
  isMy: boolean;
}

interface MessageBoxProp {
  message: string;
  backgroundColor: string;
}

const Message = ({ message, backgroundColor }: MessageBoxProp) => {
  return (
    <Box
      backgroundColor={backgroundColor}
      color="black"
      marginBottom="auto"
      borderRadius="7px"
      fontSize="7px"
      p="5px 5px"
    >
      {message}
    </Box>
  );
};

const Time = ({ time }: { time: string }) => {
  return (
    <Box fontSize={5} marginTop="auto" width="fit-content" p={1}>
      {time}
    </Box>
  );
};

const Username = ({ userName }: { userName: string }) => {
  return (
    <Box
      backgroundColor="gray.100"
      borderRadius="7px"
      width="fit-content"
      mt={0}
      mb={0.5}
      fontSize="7px"
      p="2px 5px"
      textAlign="start"
    >
      {userName}
    </Box>
  );
};

const ChatMessage = ({ userName, message, time, isMy }: ChatMessageProps) => {
  return (
    <Box width="full" p={2} m={0}>
      {!isMy && <Username userName={userName} />}
      <Flex
        display="flex"
        justifyContent={isMy ? 'right' : 'left'}
        alignContent="center"
        m={0}
      >
        {isMy ? (
          <>
            <Time time={time} />
            <Message message={message} backgroundColor="blue.100" />
          </>
        ) : (
          <>
            <Message message={message} backgroundColor="gray.100" />
            <Time time={time} />
          </>
        )}
      </Flex>
    </Box>
  );
};

export default ChatMessage;
