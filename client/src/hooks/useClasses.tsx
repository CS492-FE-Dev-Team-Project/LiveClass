import { useState, useEffect } from 'react';
import { Class, UserLoadStatus } from '../types';
import useMe from './useMe';

const useClasses = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const { status } = useMe();

  useEffect(() => {
    if (status === UserLoadStatus.LOADED) {
      fetch(
        'http://ec2-3-38-83-97.ap-northeast-2.compute.amazonaws.com/api/lobby/classes',
        {
          method: 'GET'
        }
      )
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
