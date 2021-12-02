import React from 'react';
import { Heading, FormControl, Stack, Textarea } from '@chakra-ui/react';

const ClassNotice = (onChangeLecturenotice: any) => {
  return (
    <Stack spacing="24px">
      <Heading size="md" pl="30px">
        Notice
      </Heading>
      <FormControl pl="30px">
        <Textarea
          placeholder="Description"
          onChange={onChangeLecturenotice}
          focusBorderColor="black"
          w="500px"
        />
      </FormControl>
    </Stack>
  );
};

export default ClassNotice;
