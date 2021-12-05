import { createContext } from 'react';
import { LanguageType } from '../../types';

interface langContextInterface {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
}

const langContext = createContext<langContextInterface>({
  language: LanguageType.KO,
  setLanguage: () => null
});

export default langContext;
