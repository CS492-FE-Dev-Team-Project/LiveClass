import React from 'react';
import Header from '../common/Header';

interface LobbyHeaderProps {
  backgroundColor: string;
  color: string;
  title: string;
}

const LobbyHeader = ({ backgroundColor, color, title }: LobbyHeaderProps) => {
  return (
    <Header
      backgroundColor={backgroundColor}
      color={color}
      headingText={title}
      headingSize="lg"
      p={8}
    />
  );
};

export default LobbyHeader;
