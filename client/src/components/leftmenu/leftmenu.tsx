import { CloseIcon, SettingsIcon } from '@chakra-ui/icons';
import { Box, Flex, StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import LeftMenuButton from './leftmenubutton';
import LeftMenuTab from './leftmenutab';

const LeftMenu = ({ menus }: any) => {
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
          <LeftMenuButton
            name="Setting"
            color="gray"
            icon={<SettingsIcon w={3} h={3} />}
          />
          <LeftMenuButton
            name="Quit"
            color="red"
            icon={<CloseIcon w={3} h={3} />}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default LeftMenu;
