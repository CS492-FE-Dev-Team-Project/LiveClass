import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import QuizTestPage from './pages/quizTestPage';

const App = (): React.ReactElement<any, any> => {
  return (
    <div className="App">
      <ChakraProvider>
        <QuizTestPage />
      </ChakraProvider>
    </div>
  );
};

export default App;
