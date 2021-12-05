import { TabSegment, TabType } from '../types';

const noticeTabSegment: TabSegment = {
  tabTitle: 'CS330',
  tabContents: [
    {
      tabName: 'Notice',
      type: TabType.NOTICE,
      message: 'Notice message'
    },
    {
      tabName: 'Materials',
      type: TabType.NOTICE,
      message: 'Materials message'
    }
  ]
};

export default noticeTabSegment;
