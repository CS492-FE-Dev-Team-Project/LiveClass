import React from 'react';
import { IconButton, useDisclosure, Heading } from '@chakra-ui/react';
import {
  Box,
  Input,
  InputGroup,
  Button,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption
} from '@chakra-ui/react';
import { Center, Square, Circle } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const ClassPlayList = ({
  onOpen,
  isOpen,
  onClose,
  onChangeYoutubeplaylist,
  onChangeLectureproblem,
  onChangeLectureanswer,
  onChangeLecturequiztime,
  onChangeLecturequiz,
  onOpenremove,
  isOpenremove,
  onCloseremove,
  onChangeRemovenumber,
  onChangeRemove
}: any) => {
  return (
    <Stack spacing="24px">
      <Heading size="md" pl="30px">
        Youtube Playlist
      </Heading>
      <FormControl pl="30px">
        <VStack spacing="30px">
          <Input
            type="text"
            placeholder="Youtube Material Playlist"
            onChange={onChangeYoutubeplaylist}
            w="500px"
            focusBorderColor="black"
          />
          <HStack spacing="30px">
            <>
              <IconButton
                aria-label="Add to friends"
                icon={<AddIcon />}
                onClick={onOpen}
              />
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Create Quiz</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Stack spacing="20px">
                      <Stack>
                        <Box>Problem Description</Box>
                        <Textarea
                          placeholder="Description"
                          onChange={onChangeLectureproblem}
                          focusBorderColor="black"
                        />
                      </Stack>
                      <Stack>
                        <Box>Answer</Box>
                        <Input
                          type="text"
                          placeholder="Problem Answer"
                          onChange={onChangeLectureanswer}
                          focusBorderColor="black"
                        />
                      </Stack>
                      <Stack>
                        <Box>Quiz Open Time</Box>
                        <FormLabel>If 07:34 please enter 0734</FormLabel>
                        <Input
                          type="text"
                          placeholder="Quiz pop up time"
                          onChange={onChangeLecturequiztime}
                          focusBorderColor="black"
                        />
                      </Stack>
                    </Stack>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={onChangeLecturequiz}
                    >
                      Add
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
            <>
              <IconButton
                aria-label="Add to friends"
                icon={<MinusIcon />}
                onClick={onOpenremove}
              />
              <Modal isOpen={isOpenremove} onClose={onCloseremove}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Remove quiz</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Box>Which quiz number will be removed?</Box>
                    <Input
                      type="text"
                      placeholder="Quiz number"
                      onChange={onChangeRemovenumber}
                      focusBorderColor="black"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" onClick={onChangeRemove}>
                      Remove
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          </HStack>
        </VStack>
      </FormControl>
    </Stack>
  );
};

export default ClassPlayList;
