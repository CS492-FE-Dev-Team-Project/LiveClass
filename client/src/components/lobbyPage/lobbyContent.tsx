import React from 'react';
import { SimpleGrid, Grid } from '@chakra-ui/react';

interface LobbyContentProps {
  col: string | undefined;
}

const LobbyContent = ({
  col,
  children
}: React.PropsWithChildren<LobbyContentProps>) => {
  return (
    <>
      <SimpleGrid
        gridTemplateRows="repeat(auto-fit, auto)"
        gridTemplateColumns="repeat(auto-fit, 270px)"
        spacing={8}
        p={5}
      >
        {children}
      </SimpleGrid>
    </>
  );
};

export default LobbyContent;
