import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import LeftMenuPage from './pages/leftmenu-test';

const App = (): React.ReactElement<any, any> => {
  return (
    <div className="App">
      <ChakraProvider>
        <LeftMenuPage />
      </ChakraProvider>
    </div>
  );
};

export default App;
