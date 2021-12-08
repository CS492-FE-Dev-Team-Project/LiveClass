import React, { useState, useEffect } from 'react';
import { IconButton, Textarea, Flex } from '@chakra-ui/react';
import { ChatIcon, TimeIcon } from '@chakra-ui/icons';
import AudioRecorder from './audioRecorder';

const ChatInput = ({ sendMessage }: any) => {
  const [message, setMessage] = useState('');

  // init - set keyboard keydown
  useEffect(() => {
    document.addEventListener('keydown', keydownEvents);
    return () => document.removeEventListener('keydown', keydownEvents);
  });

  const keydownEvents = (evt: any) => {
    if (!evt.shiftKey && (evt.code === 'Enter' || evt.code === 'NumpadEnter')) {
      evt.preventDefault();
      sendMessage(message);
      setMessage(''); // clear message after send
    }
  };

  return (
    <Flex p="8px 6px" w="full" backgroundColor="white" flexDir="column">
      <Textarea
        placeholder="Enter Chat"
        fontSize="14px"
        rows={2}
        m={0.5}
        borderColor="black"
        p="5px 5px"
        resize="vertical"
        value={message}
        onChange={evt => {
          setMessage(evt.target.value);
        }}
      />
      <Flex justifyContent="right">
        <IconButton
          onClick={evt => {
            sendMessage(message);
            setMessage(''); // clear message after send
          }}
          size="md"
          icon={<ChatIcon />}
          aria-label="Send Message"
          m={0.5}
        />
        <AudioRecorder />
      </Flex>
    </Flex>
  );
};

export default ChatInput;
