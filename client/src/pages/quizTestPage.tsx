import { Button } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import React from 'react';
import QuizComponent from '../components/quiz/quiz';

const QuizTestPage = (): React.ReactElement<any, any> => {
  const disclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = disclosure;
  const quiz = {
    quizTitle: 'Addition Quiz',
    quizContents: 'What is 1+1?'
  };
  return (
    <>
      <Button onClick={onOpen}>Open Quiz</Button>
      <QuizComponent quiz={quiz} disclosure={disclosure} />
    </>
  );
};
export default QuizTestPage;
