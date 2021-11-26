import React from 'react';
import { SettingsIcon } from '@chakra-ui/icons';
import {
  Flex,
  IconButton,
  Button,
  Portal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody
} from '@chakra-ui/react';

import { MarkerType } from '../../types';

interface PopoverProps {
  changeMarkerType: (markerType: MarkerType) => void;
}

const MarkerSettingsPopover = ({ changeMarkerType }: PopoverProps) => (
  <Popover placement="top-start">
    {({ onClose }) => (
      <>
        <PopoverTrigger>
          <IconButton
            aria-label="Settings"
            backgroundColor="gray.200"
            marginRight="3px"
            icon={<SettingsIcon />}
          />
        </PopoverTrigger>
        <Portal>
          <PopoverContent w="390px" h="60px">
            <PopoverBody>
              <Flex>
                <Button
                  colorScheme="red"
                  marginRight="2px"
                  onClick={() => {
                    changeMarkerType(MarkerType.QUESTION);
                    onClose();
                  }}
                >
                  Question
                </Button>
                <Button
                  colorScheme="yellow"
                  marginRight="2px"
                  onClick={() => {
                    changeMarkerType(MarkerType.QUIZ);
                    onClose();
                  }}
                >
                  Quiz
                </Button>
                <Button
                  colorScheme="blue"
                  marginRight="2px"
                  onClick={() => {
                    changeMarkerType(MarkerType.NOTICE);
                    onClose();
                  }}
                >
                  Notice
                </Button>
                <Button
                  colorScheme="green"
                  onClick={() => {
                    changeMarkerType(MarkerType.DISCUSSION);
                    onClose();
                  }}
                >
                  Discussion
                </Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </>
    )}
  </Popover>
);

export { MarkerSettingsPopover };
