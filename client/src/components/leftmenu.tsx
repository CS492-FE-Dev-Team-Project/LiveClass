import React from 'react';
import {
  VStack,
  Stack,
  StackDivider,
  Text,
  Button,
  Box,
  Heading
} from '@chakra-ui/react';

const LeftMenuItem = ({ text }: any) => {
  return <span>{text}</span>;
};

const LeftMenu = ({ menus }: any) => {
  return (
    <Box minH="100vh" maxW="150px" bg="white">
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={2}
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
              >
                {menu.tabTitle}
              </Box>
              {menu.tabContents.map((tab: any) => (
                <Button
                  colorScheme="gray"
                  variant="ghost"
                  size="sm"
                  spacing="0.0rem"
                  justifyContent="flex-start"
                >
                  {tab.tabName}
                </Button>
              ))}
            </Stack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default LeftMenu;
