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
      <Grid templateColumns={`repeat(${col ?? 4}, 1fr)`} p={5} gap={8}>
        {children}
        {/* <ClassCard
          imgSrc="https://bit.ly/2Z4KKcF"
          title="CS330"
          subTitle="Operating Systems"
          color="white"
          backGroundColor="black"
        />
        <ClassCard
          imgSrc="https://bit.ly/2Z4KKcF"
          title="CS330"
          subTitle="Operating Systems"
          color="gray.50"
          backGroundColor="green.600"
        />
        <ClassCard
          imgSrc="https://bit.ly/2Z4KKcF"
          title="CS330"
          subTitle="Operating Systems"
          color="black"
          backGroundColor="white"
        />
        <ClassCard
          imgSrc="https://bit.ly/2Z4KKcF"
          title="CS330"
          subTitle="Operating Systems"
          color="teal.400"
          backGroundColor="green.600"
        />
        <ClassCard
          imgSrc="https://bit.ly/2Z4KKcF"
          title="CS330"
          subTitle="Operating Systems"
          color="gray.50"
          backGroundColor="green.600"
        />
        <ClassCard
          imgSrc="https://bit.ly/2Z4KKcF"
          title="CS330"
          subTitle="Operating Systems"
          color="gray.50"
          backGroundColor="blue.600"
        /> */}
      </Grid>
    </>
  );
};

export default LobbyContent;
