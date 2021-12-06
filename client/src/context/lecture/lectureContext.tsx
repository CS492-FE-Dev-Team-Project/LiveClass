import { createContext } from 'react';

interface langContextInterface {
  selectedVidIdx: number;
  setSelectedVidIdx: (idx: number) => void;
}

const lectureContext = createContext<langContextInterface>({
  selectedVidIdx: 0,
  setSelectedVidIdx: () => null
});

export default lectureContext;
