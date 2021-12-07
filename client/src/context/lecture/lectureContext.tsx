import { createContext } from 'react';

interface langContextInterface {
  isLive: boolean;
  setIsLive: (status: boolean) => void;
  selectedVidIdx: number;
  setSelectedVidIdx: (idx: number) => void;
}

const lectureContext = createContext<langContextInterface>({
  isLive: false,
  setIsLive: () => null,
  selectedVidIdx: 0,
  setSelectedVidIdx: () => null
});

export default lectureContext;
