import React from 'react';
import { Heading, Input } from '@chakra-ui/react';
import { FormLabel } from '@chakra-ui/react';
import { Stack, HStack } from '@chakra-ui/react';

const ClassTime = ({
  onChangeLecturemonth,
  onChangeLectureday,
  onChangeLecturehour,
  onChangeLecturemin
}: any) => {
  return (
    <Stack spacing="24px">
      <Heading size="md" pl="30px">
        Class Time
      </Heading>
      <HStack pl="30px">
        <Input
          type="text"
          placeholder="M"
          onChange={onChangeLecturemonth}
          w="50px"
          focusBorderColor="black"
        />
        <FormLabel>/</FormLabel>
        <Input
          type="text"
          placeholder="D"
          onChange={onChangeLectureday}
          w="50px"
          focusBorderColor="black"
        />
        <FormLabel>/</FormLabel>
        <Input
          type="text"
          placeholder="H"
          onChange={onChangeLecturehour}
          w="50px"
          focusBorderColor="black"
        />
        <FormLabel>:</FormLabel>
        <Input
          type="text"
          placeholder="M"
          onChange={onChangeLecturemin}
          w="50px"
          focusBorderColor="black"
        />
      </HStack>
    </Stack>
  );
};

export default ClassTime;
