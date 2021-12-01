import React, { useEffect, useContext } from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { useSocket } from '../context/socket';

// import useClasses from '../hooks/useClasses';
// import UserContext from '../context/user/userContext';

const FloatConnectionStatus = () => {
  const { socket, connected } = useSocket();
  // const { currentClassUuid } = useContext(UserContext);

  const { classUuid } = useParams();

  useEffect(() => {
    socket?.on('GetLectures', lectureList => {
      console.log(lectureList);
    });
    socket?.on('CreateLecture', lectureId => {
      console.log(lectureId);
    });
  }, [connected]);

  // TEST - get lectures
  const getLecture = () => {
    const payload = JSON.stringify({ classUuid });
    socket?.emit('GetLectures', payload);
  };

  // TEST - create lectures
  const createLecture = () => {
    const payload = JSON.stringify({
      classUuid,
      lectureDate: new Date(),
      lectureName: 'Thread',
      playlist: 'abc'
    });
    socket?.emit('CreateLecture', payload);
  };

  // const { connected } = useSocket();
  return (
    <Flex
      position="fixed"
      left={5}
      bottom={10}
      zIndex={3}
      w="300px"
      h="200px"
      backgroundColor="gray.300"
      justifyContent="center"
      alignContent="center"
      borderRadius="30px"
      opacity="0.8"
      color={connected ? 'blue.500' : 'red.500'}
    >
      <Text height="fit-content" fontSize="2xl">{`Connected: ${
        connected ? 'True' : 'False'
      }`}</Text>

      <Button onClick={getLecture}>Get lectures</Button>
      <br />
      <Button onClick={createLecture}>Create lecture</Button>
    </Flex>
  );
};

export default FloatConnectionStatus;
