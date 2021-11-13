import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import LeftMenuPage from './pages/leftmenuTestPage';

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
