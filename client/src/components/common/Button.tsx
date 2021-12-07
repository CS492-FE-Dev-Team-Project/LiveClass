import React from 'react';
import { Button, Box } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { MarkerType } from '../../types';
import { FlagIcon } from './Icon';

interface ButtonProps {
  onClick: (arg?: any | void) => void;
}

const ClipboardButton = ({
  children,
  onClick
}: React.PropsWithChildren<ButtonProps>) => (
  <Button
    className="ClipboardButton"
    leftIcon={<CopyIcon />}
    aria-label="Settings"
    m={0.5}
    onClick={onClick}
  >
    {children}
  </Button>
);

const FlagButton = ({
  children,
  onClick
}: React.PropsWithChildren<ButtonProps>) => (
  <Button
    className="flagButton"
    leftIcon={<FlagIcon />}
    aria-label="Settings"
    m={0.5}
    onClick={onClick}
  >
    {children}
  </Button>
);

const CreateMarkerButtons: React.FC<ButtonProps> = ({ onClick }) => (
  <Box className="create-timeline-marker">
    <Button
      colorScheme="red"
      leftIcon={<FlagIcon />}
      marginRight="2px"
      onClick={() => onClick(MarkerType.QUESTION)}
    >
      Question
    </Button>
    <Button
      colorScheme="blue"
      leftIcon={<FlagIcon />}
      onClick={() => onClick(MarkerType.DISCUSSION)}
    >
      Discussion
    </Button>
  </Box>
);

export { FlagButton, ClipboardButton, CreateMarkerButtons };
