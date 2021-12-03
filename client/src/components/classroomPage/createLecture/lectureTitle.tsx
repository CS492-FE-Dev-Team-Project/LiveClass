import React from 'react';
import { Heading, Input, FormControl, Stack } from '@chakra-ui/react';

// interface changeEventHandlerProps {
//   handler: (event: React.ChangeEventHandler<HTMLInputElement>) => void;
// }

const LectureTitle = ({ onChangeLecturetitle }: any) => {
  return (
    <Stack spacing="24px">
      <Heading size="lg" pl="30px">
        Lecture Title
      </Heading>
      <FormControl pl="30px">
        <Input
          type="text"
          placeholder="Lecture Title"
          onChange={evt => onChangeLecturetitle(evt)}
          w="500px"
          focusBorderColor="black"
        />
      </FormControl>
    </Stack>
  );
};

export default LectureTitle;
