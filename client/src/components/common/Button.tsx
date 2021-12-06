import React from 'react';
import { createIcon, Button, Box } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { MarkerType } from '../../types';

const FlagIcon = createIcon({
  displayName: 'flagIcon',
  path: (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 206.505 206.505"
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M167.069,16.354c-0.426,0.186-43.29,18.671-70.274-4.481c-31.021-26.619-60.722-0.2-61.012,0.072
		L34.623,13l-0.179,193.494l7.108,0.011l0.115-122.594c5.157-4.091,27.11-19.086,50.498,0.988
		c30.356,26.047,75.839,6.438,77.765,5.59l2.133-0.938V14.153L167.069,16.354z M164.943,84.824
		c-8.997,3.389-44.603,14.874-68.148-5.322c-10.375-8.904-20.6-11.871-29.629-11.871c-10.815,0-19.923,4.266-25.489,7.702
		l0.047-59.101c5.264-4.169,27.142-18.961,50.44,1.034c24.855,21.323,59.863,12.043,72.78,7.516V84.824z"
        />
      </g>
    </svg>
  )
});

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
      marginRight="2px"
      onClick={() => onClick(MarkerType.QUESTION)}
    >
      Question
    </Button>
    <Button colorScheme="blue" onClick={() => onClick(MarkerType.DISCUSSION)}>
      Discussion
    </Button>
  </Box>
);

export { FlagButton, ClipboardButton, CreateMarkerButtons };
