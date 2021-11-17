import React from 'react';
import { SettingsIcon, CloseIcon } from '@chakra-ui/icons';
import { VStack, StackDivider, Box } from '@chakra-ui/react';
import LeftMenuTab from './leftmenutab';
import LeftMenuButton from './leftmenubutton';

const LeftMenu = ({ menus }: any) => {
  return (
    <Box h="100vh" ml="2">
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={0}
        w="150px"
        align="stretch"
      >
        {menus.map((menu: any) => (
          <LeftMenuTab
            tabTitle={menu.tabTitle}
            tabContents={menu.tabContents}
          />
        ))}
      </VStack>
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
    </Box>
  );
};

export default LeftMenu;
