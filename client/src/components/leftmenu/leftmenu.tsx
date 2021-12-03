import React, { useContext } from 'react';
import {
  ChevronRightIcon,
  CloseIcon,
  SettingsIcon,
  createIcon
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  StackDivider,
  VStack,
  IconButton,
  Portal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverCloseButton,
  PopoverArrow,
  Spacer
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { LanguageType } from '../../types';
import LeftMenuTab from './leftmenutab';
import Header from '../common/Header';
import LangContext from '../../context/language/languageContext';

const GlobeIcon = createIcon({
  displayName: 'GlobeIcon',
  path: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M24 24h-2.784l-1.07-3h-4.875l-1.077 3h-2.697l4.941-13h2.604l4.958 13zm-4.573-5.069l-1.705-4.903-1.712 4.903h3.417zm-9.252-12.804c.126-.486.201-.852.271-1.212l-2.199-.428c-.036.185-.102.533-.22 1-.742-.109-1.532-.122-2.332-.041.019-.537.052-1.063.098-1.569h2.456v-2.083h-2.161c.106-.531.198-.849.288-1.149l-2.147-.645c-.158.526-.29 1.042-.422 1.794h-2.451v2.083h2.184c-.058.673-.093 1.371-.103 2.077-2.413.886-3.437 2.575-3.437 4.107 0 1.809 1.427 3.399 3.684 3.194 2.802-.255 4.673-2.371 5.77-4.974 1.134.654 1.608 1.753 1.181 2.771-.396.941-1.561 1.838-3.785 1.792v2.242c2.469.038 4.898-.899 5.85-3.166.93-2.214-.132-4.635-2.525-5.793zm-2.892 1.531c-.349.774-.809 1.544-1.395 2.15-.09-.646-.151-1.353-.184-2.108.533-.07 1.072-.083 1.579-.042zm-3.788.724c.062.947.169 1.818.317 2.596-1.996.365-2.076-1.603-.317-2.596zm11.236-1.745l-2.075-5.533 5.414-1.104-.976 1.868c2.999 2.418 4.116 5.645 4.532 8.132-1.736-2.913-3.826-4.478-5.885-5.321l-1.01 1.958zm-7.895 10.781l1.985 5.566-5.43 1.016 1.006-1.852c-2.96-2.465-4.021-5.654-4.397-8.148 1.689 2.94 3.749 4.483 5.794 5.36l1.042-1.942zm10.795-6.029" />
    </svg>
  )
});

import { TabSegment } from '../../types';

interface LeftMenuProps {
  menus: TabSegment[];
}

const LeftMenu = ({ menus }: LeftMenuProps) => {
  const { language, setLanguage } = useContext(LangContext);
  const navigate = useNavigate();

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
            {menus.map((menu: TabSegment) => (
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
                <Button colorScheme="red" w={150} onClick={() => navigate(-1)}>
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
          <Popover placement="top-start">
            {({ onClose }) => (
              <>
                <PopoverTrigger>
                  <IconButton
                    size="sm"
                    icon={<GlobeIcon />}
                    aria-label="Settings"
                    m={0.5}
                  />
                </PopoverTrigger>
                <Portal>
                  <PopoverContent w="165px" h="60px">
                    <PopoverBody>
                      <Button
                        colorScheme="green"
                        marginRight="2px"
                        onClick={() => {
                          setLanguage(LanguageType.EN);
                          onClose();
                        }}
                      >
                        EN
                      </Button>
                      <Button
                        colorScheme="blue"
                        onClick={() => {
                          setLanguage(LanguageType.KO);
                          onClose();
                        }}
                      >
                        한글
                      </Button>
                      <PopoverCloseButton />
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </>
            )}
          </Popover>
        </Box>
      </Flex>
    </Flex>
  );
};

export default LeftMenu;
