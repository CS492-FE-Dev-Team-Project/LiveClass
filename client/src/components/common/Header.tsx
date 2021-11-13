import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

interface HeaderProps {
  backgroundColor: string;
  color: string;
  headingSize: string;
  p: number | string;
  headingText: string;
}

const Header = ({
  children,
  backgroundColor,
  color,
  headingSize,
  p,
  headingText
}: React.PropsWithChildren<HeaderProps>) => {
  return (
    <Flex width="full" p={p} backgroundColor={backgroundColor} color={color}>
      <Heading size={headingSize}>{headingText}</Heading>
      {children}
    </Flex>
  );
};

export default Header;
