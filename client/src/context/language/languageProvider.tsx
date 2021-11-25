import React, { useState } from 'react';

import langContext from './languageContext';

const langProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [language, setLanguage] = useState<string>('ko');

  return (
    <langContext.Provider value={{ language, setLanguage }}>
      {children}
    </langContext.Provider>
  );
};

export default langProvider;
