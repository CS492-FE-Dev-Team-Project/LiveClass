import { createContext } from 'react';

interface langContextInterface {
  language: string;
  setLanguage: (language: string) => void;
}

const langContext = createContext<langContextInterface>({
  language: 'ko',
  setLanguage: () => null
});

export default langContext;
