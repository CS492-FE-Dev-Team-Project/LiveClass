import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { Box } from '@chakra-ui/react';

import { MemberType, TabType } from '../../types';

import LectureContext from '../../context/lecture/lectureContext';

const LeftMenuButton = ({ entry }: any) => {
  const { classUuid, memberType, lectureId } = useParams();
  const { isLive, selectedVidIdx, setSelectedVidIdx } =
    useContext(LectureContext);

  let shouldHighlight = false;
  if (entry.type === TabType.VIDEO)
    shouldHighlight = entry.videoIdx === selectedVidIdx;

  const eventHandler = () => {
    switch (entry.type) {
      case TabType.USER:
        alert(entry.userId);
        break;
      case TabType.VIDEO:
        if (memberType === MemberType.STUDENT && isLive) return;
        setSelectedVidIdx(entry.videoIdx);
        if (memberType === MemberType.INSTRUCTOR && isLive) {
          entry.onClickHandler(); // socket?.emit('SelectVideo', ...) - control others' video
        }
        break;
      case TabType.NOTICE:
        if (entry.onClickHandler) entry.onClickHandler();
        else alert(entry.message);
        break;
      default:
        break;
    }
  };

  const MAX_TITLE_LEN = 12;

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
      borderColor={shouldHighlight ? '#FF4A3E' : 'white'}
      color="black"
      overflow="hidden"
      whiteSpace="nowrap"
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
      {entry.tabName.slice(0, MAX_TITLE_LEN)}
    </Box>
  );
};

export default LeftMenuButton;
