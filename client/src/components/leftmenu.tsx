import React from 'react';
import { SettingsIcon, CloseIcon } from '@chakra-ui/icons';
import {
  VStack,
  Stack,
  StackDivider,
  Button,
  Box,
  Spacer
} from '@chakra-ui/react';

const LeftMenu = ({ menus }: any) => {
  return (
    <Box minH="100vh" maxW="150px" bg="white" ml="2">
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={0}
        align="stretch"
      >
        {menus.map((menu: any) => (
          <Box>
            <Stack spacing={0}>
              <Box
                letterSpacing="wide"
                justifyContent="flex-start"
                fontWeight="bold"
                fontSize="sm"
                ml="2"
                mt="2"
              >
                {menu.tabTitle}
              </Box>
              {menu.tabContents.map((tab: any) => (
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
        ))}
      </VStack>
      <Spacer />
      <Box>
        <Button
          size="sm"
          w={75}
          colorScheme="gray"
          leftIcon={<SettingsIcon w={3} h={3} />}
        >
          Setting
        </Button>
        <Button
          size="sm"
          w={75}
          colorScheme="red"
          leftIcon={<CloseIcon w={3} h={3} />}
        >
          Quit
        </Button>
      </Box>
    </Box>
  );
};

export default LeftMenu;
