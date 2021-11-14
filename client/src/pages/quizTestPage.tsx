import { Button } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import React from 'react';
import QuizUser from '../components/quiz/quiz';
import CreateQuiz from '../components/quiz/createquiz';
import CreateQuizMultiple from '../components/quiz/createquizmultiple';

const QuizTestPage = (): React.ReactElement<any, any> => {
  const disclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = disclosure;
  const quiz = {
    quizTitle: 'Addition Quiz',
    quizContents: 'What is 1+1?',
    quizAnswer: '1'
  };
  const createquiz = {
    quizTitle: 'Problem Description',
    quizAnswer: 'Answer'
  };
  const createquiz2 = {
    quizTitle: 'Problem Description',
    quizOption: ['A', 'B', 'C', 'D'],
    quizAnswerOption: ['1', '2', '3', '4']
  };
  return (
    <>
      <Button onClick={onOpen}>Create Quiz</Button>
      <CreateQuiz quiz={createquiz} disclosure={disclosure} />
      {/* <CreateQuizMultiple quiz={createquiz2} disclosure={disclosure} /> */}
    </>
  );
};
export default QuizTestPage;
