import { CloseIcon, SettingsIcon } from '@chakra-ui/icons';
import { Box, Flex, StackDivider, VStack, IconButton } from '@chakra-ui/react';
import React from 'react';
import LeftMenuTab from './leftmenutab';

const LeftMenu = ({ classname, menus }: any) => {
  return (
    <Flex w="165px" h="100vh" flexDir="column">
      <Flex overflowX="hidden" overflowY="auto" flexDir="column" h="full">
        <Box h="100vh" ml="2">
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={0}
            w="165px"
            align="stretch"
          >
            {menus.map((menu: any) => (
              <LeftMenuTab
                tabTitle={menu.tabTitle}
                tabContents={menu.tabContents}
              />
            ))}
          </VStack>
        </Box>
      </Flex>
      <Flex p="26px 10px" w="full" backgroundColor="white" flexDir="column">
        <Box position="absolute" bottom={3}>
          <IconButton
            size="sm"
            colorScheme="red"
            icon={<CloseIcon />}
            aria-label="Send Message"
            m={0.5}
          />
          <IconButton
            size="sm"
            icon={<SettingsIcon />}
            aria-label="Send Message"
            m={0.5}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default LeftMenu;
