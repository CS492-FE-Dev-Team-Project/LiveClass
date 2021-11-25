import React from 'react';
import { Stack, Box, Button } from '@chakra-ui/react';
import { Menu, TabContent } from './leftmenu';

const LeftMenuTab = ({ tabTitle, tabContents }: Menu) => {
  return (
    <Box w="150px">
      <Stack spacing={0}>
        <Box
          letterSpacing="wide"
          justifyContent="flex-start"
          fontWeight="bold"
          fontSize="sm"
          ml="2"
          mt="2"
        >
          {tabTitle}
        </Box>
        {tabContents.map((tab: TabContent) => (
          <Button
            colorScheme="gray"
            variant="ghost"
            size="sm"
            justifyContent="flex-start"
          >
            {tab.tabName}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default LeftMenuTab;
