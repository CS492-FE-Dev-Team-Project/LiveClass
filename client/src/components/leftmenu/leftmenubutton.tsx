import React from 'react';
import { Box } from '@chakra-ui/react';

import {
  TabEntry,
  TabType,
  UserTabEntry,
  VideoTabEntry,
  NoticeTabEntry
} from '../../types';

const LeftMenuButton = ({ entry }: any) => {
  const eventHandler = () => {
    switch (entry.type) {
      case TabType.USER:
        alert(entry.userId);
        break;
      case TabType.VIDEO:
        alert(entry.videoIdx);
        break;
      case TabType.NOTICE:
        alert(entry.message);
        break;
      default:
        break;
    }
  };

  return (
    <Box
      as="button"
      height="28px"
      lineHeight="1.1"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      border="1px"
      px="8px"
      borderRadius="2px"
      fontSize="20px"
      textAlign="start"
      bg="white"
      borderColor="white"
      color="black"
      _hover={{ bg: '#ebedf0' }}
      _active={{
        bg: '#dddfe2',
        transform: 'scale(0.98)',
        borderColor: '#bec3c9'
      }}
      _focus={{
        boxShadow:
          '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)'
      }}
      onClick={eventHandler}
    >
      {entry.tabName}
    </Box>
  );
};

export default LeftMenuButton;
