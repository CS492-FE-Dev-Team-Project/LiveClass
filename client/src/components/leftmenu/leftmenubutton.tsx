import React from 'react';
import { Button } from '@chakra-ui/react';

const LeftMenuButton = ({ name, color, icon }: any) => {
  return (
    <Button size="sm" w={75} colorScheme={color} leftIcon={icon}>
      {name}
    </Button>
  );
};

export default LeftMenuButton;
