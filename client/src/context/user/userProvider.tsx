import React, { useState, useEffect } from 'react';
import { UserLoadStatus } from '../../types';

import UserContext from './userContext';

const UserProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [userName, setUserName] = useState('');
  const [status, setUserStatus] = useState(UserLoadStatus.LOADING);
  const [id, setId] = useState(-1);

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
            setId(r.id);
            setUserStatus(UserLoadStatus.LOADED);
          }
        })
        .catch(e => console.error(e));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userName, status, id }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
