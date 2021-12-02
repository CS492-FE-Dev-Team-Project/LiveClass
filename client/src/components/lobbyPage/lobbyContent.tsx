import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';

interface LobbyContentProps {
  col: string | undefined;
}

const LobbyContent = ({
  col,
  children
}: React.PropsWithChildren<LobbyContentProps>) => {
  return (
    <>
      <SimpleGrid minChildWidth="260px" spacing={8} p={5}>
        {children}
      </SimpleGrid>
    </>
  );
};

export default LobbyContent;
