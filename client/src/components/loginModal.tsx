import React, { useContext } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  Button,
  Image,
  ModalOverlay,
  ModalHeader,
  Spinner
} from '@chakra-ui/react';

import NaverLoginButtonAsset from '../assets/naver_login_kor.png';
import UserContext from '../context/user/userContext';
import { UserLoadStatus } from '../types';

const NaverLoginButton = ({ ...props }) => {
  return (
    <Button w={400} h={100} {...props}>
      <Image src={NaverLoginButtonAsset} w="full" h="full" />
    </Button>
  );
};

const LoginModal = () => {
  const { status } = useContext(UserContext);

  return (
    <Modal
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
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            <NaverLoginButton
              onClick={() => {
                window.location.pathname = '/api/auth/naver';
              }}
            />
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  );
};

export default LoginModal;
