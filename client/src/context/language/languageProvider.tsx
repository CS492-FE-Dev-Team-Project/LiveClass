import React, { useState } from 'react';
import langContext from './languageContext';
import { LanguageType } from '../../types';

const langProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [language, setLanguage] = useState<LanguageType>(LanguageType.KO);

  return (
    <langContext.Provider value={{ language, setLanguage }}>
      {children}
    </langContext.Provider>
  );
};

export default langProvider;
