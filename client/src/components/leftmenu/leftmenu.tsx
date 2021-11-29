import { ChevronRightIcon, CloseIcon, SettingsIcon } from '@chakra-ui/icons';
import {
  CloseButton,
  Box,
  Flex,
  StackDivider,
  VStack,
  IconButton
} from '@chakra-ui/react';
import React from 'react';
import LeftMenuTab from './leftmenutab';
import Header from '../common/Header';

export interface TabContent {
  tabName: string;
  link: string;
}

export interface Menu {
  tabTitle: string;
  tabContents: TabContent[];
}

interface LeftMenuProps {
  menus: Menu[];
}

const LeftMenu = ({ menus }: LeftMenuProps) => {
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
            {menus.map((menu: Menu) => (
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
            size="md"
            colorScheme="red"
            icon={<CloseIcon />}
            aria-label="Quit"
            m={0.5}
          />
          <IconButton
            size="md"
            icon={<SettingsIcon />}
            aria-label="Settings"
            m={0.5}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default LeftMenu;
