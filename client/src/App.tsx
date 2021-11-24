import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ClassPage from './pages/classPage';

const App = (): React.ReactElement<any, any> => {
  return (
    <div className="App">
      <ChakraProvider>
        <ClassPage />
      </ChakraProvider>
    </div>
  );
};
export default App;
