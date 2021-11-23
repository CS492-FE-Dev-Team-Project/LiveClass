import React, { useState, useEffect } from 'react';

import UserContext from './userContext';

export enum UserLoadStatus {
  LOADED,
  LOADING,
  NOTLOADED
}

const UserProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [userName, setUserName] = useState('');
  const [status, setUserStatus] = useState(UserLoadStatus.LOADING);

  useEffect(() => {
    if (status === UserLoadStatus.LOADING) {
      fetch('http://localhost:5000/api/me', {
        method: 'GET'
      })
        .then(r => r.json())
        .then(r => {
          if (r.status === 401) {
            setUserStatus(UserLoadStatus.NOTLOADED);
          } else if (r.status === 200) {
            console.log('Logged IN');
            setUserName(r.userName);
            setUserStatus(UserLoadStatus.LOADED);
          }
        })
        .catch(e => console.error(e));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userName, status }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
