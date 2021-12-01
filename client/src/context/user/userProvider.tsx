import React, { useState, useEffect } from 'react';
import { UserLoadStatus } from '../../types';

import UserContext from './userContext';

const UserProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [userId, setUserId] = useState(0);
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
            setUserId(r.userId);
            setUserName(r.userName);
            setUserStatus(UserLoadStatus.LOADED);
          }
        })
        .catch(e => console.error(e));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId, userName, status }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
