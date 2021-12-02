import { ChevronRightIcon, CloseIcon, SettingsIcon } from '@chakra-ui/icons';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Box,
  Flex,
  StackDivider,
  VStack,
  IconButton,
  Spacer
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
    <Flex w="190px" h="100vh" flexDir="column">
      <Flex overflowX="hidden" overflowY="auto" flexDir="column">
        <Box ml="2">
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={0}
            w="190px"
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
      <Spacer />
      <Flex p="10px 10px" w="full" backgroundColor="white" flexDir="column">
        <Box bottom={0}>
          <Popover>
            <PopoverTrigger>
              <IconButton
                size="md"
                colorScheme="red"
                icon={<CloseIcon />}
                aria-label="Quit"
                m={0.5}
              />
            </PopoverTrigger>
            <PopoverContent w={180}>
              <PopoverArrow />
              <PopoverBody>
                <Button colorScheme="red" w={150}>
                  Quit Class
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
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
