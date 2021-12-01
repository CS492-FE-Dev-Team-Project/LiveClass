import React, { useContext } from 'react';
import {
  Box,
  Flex,
  VStack,
  Spacer,
  Modal,
  ModalBody,
  ModalContent,
  Button,
  Image,
  ModalOverlay,
  ModalHeader,
  Spinner
} from '@chakra-ui/react';

import NaverLoginButtonAsset from '../assets/naver_login_eng.png';
import UserContext from '../context/user/userContext';
import { UserLoadStatus } from '../types';
import LogoAsset from '../assets/logo1.svg';

const NaverLoginButton = ({ ...props }) => {
  return (
    <Button w={460} h={100} colorScheme="white" {...props}>
      <Image src={NaverLoginButtonAsset} fit="fill" />
    </Button>
  );
};

const LoginModal = () => {
  const { status } = useContext(UserContext);

  return (
    <Modal
      size="xl"
      isOpen={status !== UserLoadStatus.LOADED}
      onClose={() => {
        console.log();
      }}
    >
      <ModalOverlay />
      {status === UserLoadStatus.LOADING ? (
        <Spinner />
      ) : (
        <ModalContent>
          <ModalHeader>
            <VStack w="100%">
              <Flex w="100%" h="60px">
                <Spacer />
                <Image src={LogoAsset} alt="liveclass" h="60px" />
                <Spacer />
              </Flex>
              <Box
                w="100%"
                textAlign="center"
                fontSize="50px"
                fontWeight="bold"
              >
                LOG IN
              </Box>
            </VStack>
          </ModalHeader>
          <ModalBody>
            <Flex>
              <Box w="100%" display="flex">
                <Spacer />
                <NaverLoginButton
                  onClick={() => {
                    window.location.pathname = '/api/auth/naver';
                  }}
                />
                <Spacer />
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  );
};

export default LoginModal;
