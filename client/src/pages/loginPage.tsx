import React from 'react';
import { Flex, Heading, Button, Image } from '@chakra-ui/react';

import NaverLoginButtonAsset from '../assets/naver_login_kor.png';

const NaverLoginButton = ({ ...props }) => {
  return (
    <Button w={400} h={100} {...props}>
      <Image src={NaverLoginButtonAsset} w="full" h="full" />
    </Button>
  );
};

const LoginPage = () => {
  return (
    <Flex justifyContent="center" alignContent="center" h="100vh">
      <Flex flexDir="column" alignContent="center" justifyContent="center">
        <Heading textAlign="center">Login</Heading>
        <NaverLoginButton
          onClick={() => {
            window.location.pathname = '/api/auth/naver';
          }}
        />
      </Flex>
    </Flex>
  );
};

export default LoginPage;
