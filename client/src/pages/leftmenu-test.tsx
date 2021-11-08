import React from 'react';
import LeftMenu from '../components/leftmenu';

const LeftMenuPage = (): React.ReactElement<any, any> => {
  // For example
  const classData = {
    classId: 1,
    name: 'CS330'
  };
  const lectures = [
    {
      lectureId: 1,
      date: 'October 10'
    },
    {
      lectureId: 2,
      date: 'October 17'
    }
  ];
  return <LeftMenu classData={classData} lectures={lectures} />;
};
export default LeftMenuPage;
