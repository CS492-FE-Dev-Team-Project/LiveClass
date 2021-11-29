import React from 'react';
import { Grid } from '@chakra-ui/react';

interface LobbyContentProps {
  col: string | undefined;
}

const LobbyContent = ({
  col,
  children
}: React.PropsWithChildren<LobbyContentProps>) => {
  return (
    <>
      <Grid templateColumns={`repeat(${col ?? 5}, 1fr)`} p={5} gap={8}>
        {children}
      </Grid>
    </>
  );
};

export default LobbyContent;
