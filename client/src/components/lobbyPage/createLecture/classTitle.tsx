import React from 'react';
import { Heading } from '@chakra-ui/react';
import { Input, FormControl } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';

const ClassTitle = (onChangeLecturetitle: any) => {
  return (
    <Stack spacing="24px">
      <Heading size="lg" pl="30px">
        Class Title
      </Heading>
      <FormControl pl="30px">
        <Input
          type="text"
          placeholder="Class Title"
          onChange={onChangeLecturetitle}
          w="500px"
          focusBorderColor="black"
        />
      </FormControl>
    </Stack>
  );
};

export default ClassTitle;
