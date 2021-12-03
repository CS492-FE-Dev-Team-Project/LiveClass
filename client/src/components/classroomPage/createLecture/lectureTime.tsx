import React, { useState } from 'react';
import { Heading, Input, FormLabel, Stack, HStack } from '@chakra-ui/react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface classTimeInput {
  lectureDate: Date;
  setLectureDate: (date: Date) => void;
}

const LectureTime = ({ lectureDate, setLectureDate }: classTimeInput) => {
  return (
    <Stack spacing="24px">
      <Heading size="md" pl="30px">
        Lecture Time
      </Heading>
      <HStack pl="30px">
        <DatePicker
          selected={lectureDate}
          onChange={(date: Date) => setLectureDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="yyyy.MM.dd h:mm aa"
        />
      </HStack>
      {/* {lectureDate} */}
    </Stack>
  );
};

export default LectureTime;
