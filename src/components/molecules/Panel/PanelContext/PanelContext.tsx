import React, { useContext } from 'react';

import { PanelClasses } from '../Panel.d';

interface PanelContext {
  classes?: PanelClasses;
  selectedPanelIndex: number;
  selectedTabIndexRecord: Record<number, number>;
  setSelectedPanelIndex: React.Dispatch<React.SetStateAction<number>>;
  setSelectedTabIndexRecord: React.Dispatch<
    React.SetStateAction<Record<number, number>>
  >;
}

const PanelContext = React.createContext<PanelContext>({
  selectedPanelIndex: 0,
  selectedTabIndexRecord: {},
  setSelectedPanelIndex: () => {},
  setSelectedTabIndexRecord: () => {},
});

export const usePanelContext = () => useContext(PanelContext);

export default PanelContext;
