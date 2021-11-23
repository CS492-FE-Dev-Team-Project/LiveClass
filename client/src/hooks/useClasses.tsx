import { useState, useEffect } from 'react';
import { UserLoadStatus } from '../context/user/userProvider';
import useMe from './useMe';

export interface Class {
  uuid: string;
  title: string;
  subtitle: string;
  memberType: MemberType;
}

export enum MemberType {
  INSTRUCTOR = 'instructor',
  STUDENT = 'student'
}

const useClasses = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const { status } = useMe();

  useEffect(() => {
    if (status === UserLoadStatus.LOADED) {
      fetch('http://localhost:5000/api/lobby/classes', {
        method: 'GET'
      })
        .then(r => r.json())
        .then(j => {
          setClasses(j.classes);
        })
        .catch(e => console.error(e));
    }
  }, [status]);

  const addClass = (newClass: Class) => {
    setClasses(classArr => [...classArr, newClass]);
  };

  return { classes, addClass };
};

export default useClasses;
