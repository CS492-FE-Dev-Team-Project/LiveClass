import React from 'react';
import { Stack, Box, Button } from '@chakra-ui/react';
import { TabSegment, TabEntry } from '../../types';
import LeftMenuButton from './leftmenubutton';

const LeftMenuTab = ({ tabTitle, tabContents }: TabSegment) => {
  return (
    <Box w="175px">
      <Stack spacing={0}>
        <Box
          letterSpacing="wide"
          justifyContent="flex-start"
          fontWeight="bold"
          fontSize="18px"
          ml="2"
          mt="2"
        >
          {tabTitle}
        </Box>
        <Box w="100%" h="3px" />
        {tabContents.map((tab: TabEntry) => {
          return (
            <>
              <LeftMenuButton entry={tab} />
              <Box w="100%" h="3px" />
            </>
          );
        })}
      </Stack>
    </Box>
  );
};

export default LeftMenuTab;
