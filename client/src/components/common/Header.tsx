import React from 'react';
import { Flex, Heading, Box } from '@chakra-ui/react';

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
    <Flex
      width="full"
      p={p}
      backgroundColor={backgroundColor}
      color={color}
      justify="space-between"
    >
      <Heading mt="3px" size={headingSize}>
        {headingText}
      </Heading>
      <Flex>{children}</Flex>
    </Flex>
  );
};

export default Header;
