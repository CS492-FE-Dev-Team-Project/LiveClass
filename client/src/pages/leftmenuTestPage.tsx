import React from 'react';
import LeftMenu from '../components/leftmenu/leftmenu';

const LeftMenuPage = (): React.ReactElement<any, any> => {
  const menus = [
    {
      tabTitle: 'CS330',
      tabContents: [
        {
          tabName: 'Notice',
          link: ''
        },
        {
          tabName: 'Materials',
          link: ''
        }
      ]
    },
    {
      tabTitle: 'Playlist',
      tabContents: [
        {
          tabName: 'Menu Item',
          link: ''
        },
        {
          tabName: 'Menu Item',
          link: ''
        }
      ]
    },
    {
      tabTitle: 'Participants',
      tabContents: [
        {
          tabName: 'JungIn',
          link: ''
        },
        {
          tabName: 'JaeHo',
          link: ''
        },
        {
          tabName: 'HyunChul',
          link: ''
        },
        {
          tabName: 'Sanghyun',
          link: ''
        }
      ]
    },
    {
      tabTitle: 'Lectures',
      tabContents: [
        {
          tabName: 'October 23',
          link: ''
        },
        {
          tabName: 'October 27',
          link: ''
        }
      ]
    }
  ];
  return <LeftMenu menus={menus} />;
};

export default LeftMenuPage;
